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
    MasterSchema = require('./schemi/Master.react.jsx');

var AddJsonTemplate = React.createClass({

    getInitialState: function() {
        return {
            nome: "Prova",
            json: ""
        };
    },

    componentDidMount: function() {
        var questo = this;
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickAddJsonTemplate: function(event) {
        fetch('api/addJsonTemplate', {
            method: 'POST',
            body: JSON.stringify({
                nome: this.state.nome,
                json: this.state.json
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

    onTextAreaChange: function(event) {
        this.setState({
            nome: this.state.nome,
            json: event.target.value
        });
    },

    onInputChange: function(event) {
        this.setState({
            nome: event.target.value,
            json: this.state.json
        });
    },

    /**
     * @return {object}
     */
    render: function() {

        return (
            <div>
                <h1 className="page-header">Edit Schema</h1>
                <button onClick={this.onClickAddJsonTemplate} type="button" className="btn btn-primary">Save</button>
                <div className="form-group">
                    <label>Nome Schema</label>
                    <input type=""text onChange={this.onInputChange} value={this.state.name} />
                </div>
                <div className="form-group">
                    <textarea onChange={this.onTextAreaChange} name="jsonTemplate" value={this.state.json} />
                </div>
            </div>
        );
    }

});

module.exports = AddJsonTemplate;
