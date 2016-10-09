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
    Utils = require('../Utils.jsx');

var ArrayField = React.createClass({

    getInitialState: function() {
        return {
            numberOfSchemas: 0,
            schema: this.props.schema
        };
    },

    componentDidMount: function() {
        var questo = this;
    },

    onClickAddSchema: function() {
        var numero = this.state.numberOfSchemas + 1;

        this.setState({
            numberOfSchemas: numero,
            schema: this.state.schema
        });
    },

    /**
     * @return {object}
     */
    render: function() {
        var properties = [],
            profondita = 0,
            divStyle = {
                marginLeft: '25px'
            };

        for( var i=0; i<this.state.numberOfSchemas; i++ ){
            var key = i;
            properties.push(Utils.recognizeSchema(i, this.state.schema.items, profondita));
        }

        return (
            <div className="contArray">
                <h4>{this.props.schema.id}</h4>
                <div className="contArrayProperties" style={divStyle}>
                    {properties}
                </div>
                <button onClick={this.onClickAddSchema} type="button" className="btn btn-primary">Add</button>
            </div>
        );
    }

});

module.exports = ArrayField;
