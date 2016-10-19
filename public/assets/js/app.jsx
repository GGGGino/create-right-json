/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    SchemiJsonTable = require('./myApp/components/SchemiJsonTable.react.jsx'),
    AddJsonTemplate = require('./myApp/components/AddJsonTemplate.react.jsx'),
    SchemiActions = require('./myApp/actions/schemiActions'),
    $ = require('jquery');

fetch('api/getJsons')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        SchemiActions.createList(myJson);

        ReactDOM.render(
            <SchemiJsonTable/>,
            document.getElementById('elencoJsonGeneral')
        );
    });

$('.addJsonTemplate').on('click', function(e){
    ReactDOM.render(
        <AddJsonTemplate/>,
        document.getElementById('schemaDetail')
    );
});
