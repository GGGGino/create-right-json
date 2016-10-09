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
    SchemiActions = require('../actions/schemiActions'),
    JSONEditor = require('jsoneditor');

var SchemaEditBox = React.createClass({

    getInitialState: function() {
        return {
            editor: null,
            schema: this.props.schema
        };
    },

    componentDidMount: function() {
        var element = this.refs.editJson,
            options = {
                mode: 'tree'
            };
        this.state.editor = new JSONEditor(element, options);
        this.state.editor.set(this.state.schema);
    },

    componentDidUpdate: function() {
        this.state.editor.set(this.state.schema);
    },

    onClickEditSchema: function() {
        fetch('api/editJson', {
            method: 'PUT',
            body: JSON.stringify({
                nome: this.props.nomeSchema,
                schema: this.state.editor.get()
            }),
            cache: 'default',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function(response) {
            return response.json();
        }).then(function(myJson) {
            console.log(myJson);
        });
    },

    componentWillReceiveProps: function(nextProps) {
        this.state.schema = nextProps.schema;
        this.setState(this.state);
    },

    /**
     * @return {object}
     */
    render: function() {

        return (
            <div>
                <h1 className="page-header">Edit Schema</h1>
                <button onClick={this.onClickEditSchema} type="button" className="btn btn-primary">Save</button>
                <div ref="editJson"></div>
            </div>
        );
    }

});

module.exports = SchemaEditBox;
