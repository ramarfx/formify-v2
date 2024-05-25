<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::apiResource('/forms', FormController::class);

    Route::post('/forms/{slug}/questions', [QuestionController::class, 'store']);
    Route::delete('/forms/{slug}/questions/{question_id}', [QuestionController::class, 'destroy']);

    ROute::post('/forms/{slug}/responses', [ResponseController::class, 'store']);
    ROute::get('/forms/{slug}/responses', [ResponseController::class, 'index']);
});
