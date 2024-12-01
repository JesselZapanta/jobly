<?php

namespace App\Http\Middleware;

use App\Models\Employer;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $hasProfile = Employer::where('user_id', Auth::user()->id)->exists();

        if ($hasProfile) {
            return redirect()->route('employer.profile');
        }
        
        return $next($request);
    }
}
