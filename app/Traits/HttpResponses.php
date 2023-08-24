<?php

namespace App\Traits;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Validation\ValidationException;

/**
 * 
 */
trait HttpResponses
{
    /**
     * @param ?mixed $data
     * @param ?string $message
     * @param ?int $code
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    protected function success($data = null, $message = '', $code = 200)
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message ? $message : 'Success',
            'data' => $data
        ], $code ?? 200);
    }

    /**
     * @param ?string $message
     * @param ?int $code
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    protected function error($message = '', $code = 400)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message ? $message : 'error_msg'
        ], $code ?? 400);
    }

    /**
     * @param ?string $message
     * @param ?int $code
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    protected function not_found($message = '', $code = 404)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message ? $message : 'not found'
        ], $code ?? 404);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthorized()
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message ?? 'unauthorized'
        ], 401);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    protected function onSuccessfulLogin(User $user)
    {
        $token = $user->createToken('bearer')->plainTextToken;

        return $this->success(compact('user', 'token'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    protected function userData(User $user)
    {
        $user_data = new UserResource($user);

        return $this->success($user_data);
    }
}
