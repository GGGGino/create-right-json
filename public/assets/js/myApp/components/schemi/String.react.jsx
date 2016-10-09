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

var StringField = React.createClass({

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
            defaultValue = this.props.schema.default;
        return (
            <div key={this.props.schema.id} className="form-group">
                <div className="form-inline">
                    <label>{this.props.schema.id}:&nbsp;&nbsp;</label>
                    <input type="text" defaultValue={defaultValue} style={style} className="form-control" />
                </div>
            </div>
        );
    }

});

module.exports = StringField;
