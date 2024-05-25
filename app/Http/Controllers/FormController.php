<?php

namespace App\Http\Controllers;

use App\Models\AllowedDomain;
use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = Form::all();
        return response()->json(['message' => 'Get all forms success', 'forms' => $forms]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:forms,slug|alpha_dash',
            'allowed_domains' => 'required|array',
            'description' => 'nullable',
            'limit_one_response' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field", 'errors' => $validator->errors()], 422);
        }

        $form = Form::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'limit_one_response' => $request->limit_one_response,
            'creator_id' => Auth::id(),
        ]);

        foreach ($request->allowed_domains as $domain) {
            AllowedDomain::create(['form_id' => $form->id, 'domain' => $domain]);
        }

        return response()->json(['message' => 'Create form success', 'form' => $form]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $form = Form::where('slug', $id)->first();

        if (!$form) {
            return response()->json(['message' => 'Form not found']);
        }

        $user = Auth::user();
        $userDomain = explode('@', $user->email)[1];
        $allowedDomains = AllowedDomain::where('form_id', $form->id)->pluck('domain')->toArray();

        if (!in_array($userDomain, $allowedDomains)) {
            return response()->json(['message' => 'Forbidden access'], 403);
        }

        $question = Question::where('form_id', $form->id)->get();

        return response()->json(['message' => 'Get form success', 'form' => [
            'id' => $form->id,
            'name' => $form->name,
            'slug' => $form->slug,
            'description' => $form->description,
            'limit_one_response' => $form->limit_one_response,
            'creator_id' => $form->creator_id,
            'allowed_domains' => $allowedDomains
        ], 'questions' => $question ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
