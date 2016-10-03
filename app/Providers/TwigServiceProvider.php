<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

/**
 * Description of TwigServiceProvider
 *
 * @author ggggino
 */
class TwigServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->singleton('viewTwig', function ($app) {
            $options = [
                'debug' => env('APP_DEBUG'),
                'cache' => $app->basePath() . "/cache"
            ];

            $loader = new \Twig_Loader_Filesystem($app->basePath() . "/views");
            $twig = new \Twig_Environment($loader, $options);

            return $twig;
        });
    }

}