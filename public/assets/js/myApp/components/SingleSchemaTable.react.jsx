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
var SchemiActions = require('../actions/schemiActions');

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

    /**
     * @return {object}
     */
    render: function() {
        return (
            <tr>
                <td>
                    <a>{this.props.schema}</a>
                </td>
            </tr>
        );
    }

});

module.exports = SingleSchemaTable;
