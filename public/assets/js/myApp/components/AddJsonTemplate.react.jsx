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
        console.log(this.state.json);
    },

    onTextAreaChange: function(event) {
        this.setState({
            json: event.target.value
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
                    <textarea onChange={this.onTextAreaChange} name="jsonTemplate" value={this.state.json} />
                </div>
            </div>
        );
    }

});

module.exports = AddJsonTemplate;
