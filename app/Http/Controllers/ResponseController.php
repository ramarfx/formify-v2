<?php

namespace App\Http\Controllers;

use App\Models\AllowedDomain;
use App\Models\Form;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResponseController extends Controller
{
    public function index(string $slug)
    {
        $form = Form::where('slug', $slug)->first();

        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        $allowedDomain = AllowedDomain::where('form_id', $form->id)->pluck('domain')->toArray();
        $user = explode('@', Auth::user()->email)[1];

        if (!in_array($user, $allowedDomain)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $responses = Response::with('answers')->get();

        $responseMap = $responses->map(function ($response) use ($form) {
            return [
                'date' => $response->date,
                'user' => User::where('id', $response->user_id)->first(),
                'answers' => $response->answers->mapWithKeys(function ($answer) use ($form) {
                    $question = Question::find($answer->question_id)->name;
                    return [
                        $question => $answer->value,
                    ];
                })
            ];
        });

        return response()->json(['message' => 'Get responses success', 'responses' => $responseMap]);
    }


    public function store(Request $request, string $slug)
    {
        $form = Form::where('slug', $slug)->first();

        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        $allowedDomain = AllowedDomain::where('form_id', $form->id)->pluck('domain')->toArray();
        $user = explode('@', Auth::user()->email)[1];

        if (!in_array($user, $allowedDomain)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($form->limit_one_response) {
            $response = Response::where('form_id', $form->id)->where('user_id', Auth::id())->first();

            if ($response) {
                return response()->json(['message' => 'You can not submit form twice'], 422);
            }
        }

        $validator = Validator::make($request->all(), [
            'answers' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field", 'errors' => $validator->errors()], 422);
        }

        $response = Response::create([
            'form_id' => $form->id,
            'user_id' => Auth::id(),
            'date' => now()
        ]);

        foreach ($request->answers as $answer) {
            Answer::create([
                'response_id' => $response->id,
                'question_id' => $answer['question_id'],
                'value' => $answer['value']
            ]);
        }

        return response()->json(['message' => "Submit response success"]);
    }
}
