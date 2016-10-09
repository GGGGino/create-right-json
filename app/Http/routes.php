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
use Illuminate\Http\Request;

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

    $app->post('getJson', function (Request $request) use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        $nome = $request->request->get('nome');
        return response()->json($jsonM->getJsonDetailInFolder($nome));
    });

    $app->put('editJson', function (Request $request) use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');

        $nome = $request->request->get('nome');
        $schema = $request->request->get('schema');

        return response()->json($jsonM->changeJsonInFolder($nome, $schema));
    });

});
