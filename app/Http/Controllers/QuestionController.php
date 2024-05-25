<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function store(Request $request, string $slug)
    {
        $form = Form::where('slug', $slug)->first();

        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        if (Auth::id() != $form->creator_id) {
            return response()->json(['message' => "Forbidden"], 403);

        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'choice_type' => 'required|in:short answer,paragraph,date,multiple choice,dropdown,checkboxes',
            'choices' => 'required_if:choice_type,multiple choice,dropdown,checkboxes',
            'is_required' => 'nullable|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field", 'errors' => $validator->errors()], 422);
        }

        $choices = implode(',', $request->choices);

        $question = Question::create([
            'name' => $request->name,
            'choice_type' => $request->choice_type,
            'choices' => $choices,
            'form_id' => $form->id,
            'is_required' => $request->is_required
        ]);

        return response()->json(['message' => 'Add question success', 'question' => $question]);
    }

    public function destroy(string $slug, string $question_id){
        $form = Form::where('slug', $slug)->first();

        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }

        $question = Question::where('id', $question_id)->where('form_id', $form->id)->first();

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        if (Auth::id() != $form->creator_id) {
            return response()->json(['message' => "Forbidden"], 403);
        }

        $question->delete();

        return response()->json(['message' => 'Delete question success']);
    }
}
