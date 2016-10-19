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

    /**
     * Prendo la lista dei nomi degli schemi disponibili
     */
    $app->get('getJsons', function () use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        return response()->json($jsonM->getJsonsInFolder());
    });

    /**
     * Prendo lo schema tramite il nome passato in POST
     */
    $app->post('getJson', function (Request $request) use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');
        $nome = $request->request->get('nome');
        return response()->json($jsonM->getJsonDetailInFolder($nome));
    });

    /**
     * Aggiungo un template json
     */
    $app->post('addJsonTemplate', function (Request $request) use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');

        $nome = $request->request->get('nome');
        $json = $request->request->get('json');

        $jsonAdded = $jsonM->addJsonTemplate($nome, $json);
        return response()->json($jsonAdded);
    });

    /**
     * Faccio l'edit di un template json
     */
    $app->put('editJson', function (Request $request) use ($app) {
        /** @var JsonManager $jsonM */
        $jsonM = $app->make('jsonManager');

        $nome = $request->request->get('nome');
        $schema = $request->request->get('schema');

        return response()->json($jsonM->changeJsonInFolder($nome, $schema));
    });

});
