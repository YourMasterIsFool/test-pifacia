<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    use ResponseTrait;
    public function handle($request, Closure $next)
    {
        if ($request->user() && !$request->user()->role->name != 'administrator') {
          
            return $this->notFound(null);
        }
        return $next($request);
    }
}
