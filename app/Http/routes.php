<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use App\CustomClasses\JsonManager;

$app->get('/', function () use ($app) {
    $twig = $app->make('viewTwig');
    return $twig->render('layout.html.twig', array('prova' => 'Fabien'));
});

$app->group(['prefix' => 'api'], function () use ($app) {

    $app->get('getJsons', function () use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        return response()->json($jsonM->getJsonsInFolder());
    });

    $app->get('getJson', function () use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        return response()->json($jsonM->getJsonDetailInFolder("calendario.json"));
    });

    $app->post('json', function () use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        return response()->json($jsonM->getJsonDetailInFolder("calendario.json"));
    });

});
