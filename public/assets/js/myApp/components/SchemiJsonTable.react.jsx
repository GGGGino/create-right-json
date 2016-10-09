/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var SchemiActions = require('../actions/schemiActions');
var SingleSchemaTable = require('./SingleSchemaTable.react.jsx');

var SchemiJsonTable = React.createClass({

    getInitialState: function() {
        return SchemiActions.retrieveState();
    },

    componentDidMount: function() {
        var questo = this;

        fetch('api/getJsons')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                SchemiActions.createList(myJson);
                questo.setState(myJson);
            });
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var schemi = [],
            allSchemi = SchemiActions.retrieveState();

        for (var key in allSchemi.listaSchemi) {
            var schema = {
                    nome: allSchemi.listaSchemi[key]
                },
                chiaveChild = parseInt(Math.random() * 1000) + "";

            schemi.push(<SingleSchemaTable key={chiaveChild} schema={schema} />);
        }

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Schema</th>
                    </tr>
                </thead>
                <tbody>
                    {schemi}
                </tbody>
            </table>
        );
    }

});

module.exports = SchemiJsonTable;
