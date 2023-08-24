<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use HttpResponses;

    function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        try {
            if (!Auth::attempt($credentials)) {
                return $this->error('Invalid credentials');
            }

            /** @var User $user */
            $user = Auth::user();

            return $this->onSuccessfulLogin($user);
        } catch (\Throwable $th) {
            return $this->error();
        }
    }

    function signup(SignUpRequest $request)
    {
        try {
            $data = $request->validated();

            $data['password'] = bcrypt($data['password']);

            /** @var User $user */
            $user = User::create($data);

            return $this->onSuccessfulLogin($user);
        } catch (\Throwable $th) {
            return $this->error();
        }
    }

    function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->success(null, 'Logged Out', 204);
        } catch (\Throwable $th) {
            return $this->error();
        }
    }
}
