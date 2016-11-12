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
    SchemiActions = require('../../actions/schemiActions'),
    Utils = require('../Utils.jsx');

var SelectField = React.createClass({

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

    handleChange: function(value) {
        var path = Utils.completeKey(this.props.profondita, this.props.keyField);
        SchemiActions.editInForm(path, value.target.value);
    },

    /**
     * @return {object}
     */
    render: function() {
        var style = {
                width: '200px'
            },
            options = [],
            idLabel = null,
            key = Utils.completeKey(this.props.profondita, this.props.keyField);

        if( this.props.schema.id !== undefined )
            idLabel = <label>{this.props.schema.id}:&nbsp;&nbsp;</label>;

        for( var enu in this.props.schema.enum ){
            options.push(<option key={enu} value={this.props.schema.enum[enu]}>{this.props.schema.enum[enu]}</option>);
        }

        return (
            <div key={key} className="form-group">
                <div className="form-inline">
                    {idLabel}
                    <select className="form-control" onChange={this.handleChange}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }

});

module.exports = SelectField;
