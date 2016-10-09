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

var SchemaDetailBox = React.createClass({

    getInitialState: function() {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function() {
        var questo = this;
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {


        return (
            <div>
                <h1 className="page-header">Create Schema From Template</h1>
                <MasterSchema schema={this.props.schema}/>
                <pre>
                    {JSON.stringify(this.props.schema, null, 2) }
                </pre>
            </div>
        );
    }

});

module.exports = SchemaDetailBox;
