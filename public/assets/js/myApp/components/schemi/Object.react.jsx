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

var ObjectField = React.createClass({

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
        var cleanedSchema = Utils.cleanSchema(this.props.schema),
            properties = [],
            divStyle = {
                marginLeft: '25px'
            };

        for(var propName in cleanedSchema.properties) {
            var key = cleanedSchema.properties[propName].id,
                profondita = Utils.completeKey(this.props.profondita, this.props.keyField);

            properties.push(Utils.recognizeSchema(key, cleanedSchema.properties[propName], profondita));
        }

        return (
            <div className="contObject">
                <h4>{this.props.schema.id}</h4>
                    <div className="contPropObject" style={divStyle}>
                    {properties}
                    </div>
            </div>
        );
    }

});

module.exports = ObjectField;
