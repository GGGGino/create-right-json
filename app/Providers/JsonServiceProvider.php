<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use App\CustomClasses\JsonManager;

/**
 * Description of TwigServiceProvider
 *
 * @author ggggino
 */
class JsonServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->singleton('jsonManager', function ($app) {
            return new JsonManager();
        });
    }

}