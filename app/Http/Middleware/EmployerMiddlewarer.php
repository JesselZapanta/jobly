<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmployerMiddlewarer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        {
        //check if the role is 1 = employer

        if(Auth::check() && Auth::user()->role === 1){
                return $next($request);
            }

            abort(403, 'Access Denied'); 
        }
    }
}
