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

var React = require('react'),
    ReactDOM = require('react-dom'),
    SchemiActions = require('../actions/schemiActions'),
    SchemaDetailBox = require('./SchemaDetailBox.react.jsx'),
    SchemaFormBox = require('./SchemaFormBox.react.jsx'),
    SchemaEditBox = require('./SchemaEditBox.react.jsx');

var SingleSchemaTable = React.createClass({

    getInitialState: function() {
        return this.props.schema;
    },

    componentDidMount: function() {
        //SchemiStore.addChangeListener(this._onChange);

    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickLoadSchema: function(typeView) {
        var formData = new FormData(),
            nomeSchema = this.props.schema.nome;

        formData.set('nome', nomeSchema);

        fetch('api/getJson', {
            method: 'POST',
            body: formData,
            cache: 'default'
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {

            switch(typeView){
                case "view":
                    ReactDOM.render(
                        <SchemaDetailBox schema={myJson} />,
                        document.getElementById('schemaDetail')
                    );
                    break;

                case "add":
                    ReactDOM.render(
                        <SchemaFormBox schema={myJson} />,
                        document.getElementById('schemaDetail')
                    );
                    break;

                case "edit":
                    ReactDOM.render(
                        <SchemaEditBox nomeSchema={nomeSchema} schema={myJson} />,
                        document.getElementById('schemaDetail')
                    );
                    break;
            }
        });
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            <tr>
                <td>
                    {this.props.schema.nome}
                    <span onClick={this.onClickLoadSchema.bind(this, 'add')} className="glyphicon glyphicon-plus text-right pull-right p-l-10" aria-hidden="true"></span>
                    <span onClick={this.onClickLoadSchema.bind(this, 'edit')} className="glyphicon glyphicon-pencil text-right pull-right p-l-10" aria-hidden="true"></span>
                    <span onClick={this.onClickLoadSchema.bind(this, 'view')} className="glyphicon glyphicon-zoom-in text-right pull-right p-l-10" aria-hidden="true"></span>
                </td>
            </tr>
        );
    }

});

module.exports = SingleSchemaTable;
