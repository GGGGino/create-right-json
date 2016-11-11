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

    /**
     * @return {object}
     */
    render: function() {
        var style = {
                width: '200px'
            },
            options = [],
            id = null;

        if( this.props.schema.id !== undefined )
            id = <label>{this.props.schema.id}:&nbsp;&nbsp;</label>;

        for( var enu in this.props.schema.enum ){
            options.push(<option key={enu} value={this.props.schema.enum[enu]}>{this.props.schema.enum[enu]}</option>);
        }

        return (
            <div key={this.props.schema.id} className="form-group">
                <div className="form-inline">
                    {id}
                    <select className="form-control">
                        {options}
                    </select>
                </div>
            </div>
        );
    }

});

module.exports = SelectField;
