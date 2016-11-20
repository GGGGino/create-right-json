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

var Master = React.createClass({

    getInitialState: function() {
        var resultJson = SchemiActions.getDataInForm();

        return {
            schema: this.props.schema,
            showResultJson: false,
            resultJson: resultJson
        };
    },

    componentDidMount: function() {
        var questo = this;
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickPrintJson: function() {
        var resultJson = SchemiActions.getDataInForm();
        
        this.setState({
            schema: this.props.schema,
            showResultJson: true,
            resultJson: resultJson
        });
    },

    /**
     * @return {object}
     */
    render: function() {
        var cleanedSchema = Utils.cleanSchema(this.props.schema),
            properties = [],
            profondita = 0,
            resultJson = null;

        for(var propName in cleanedSchema.properties) {
            var key = cleanedSchema.properties[propName].id;
            properties.push(Utils.recognizeSchema(key, cleanedSchema.properties[propName], null));
        }

        if( this.state.showResultJson ){
            resultJson = <pre>{ JSON.stringify(this.state.resultJson, null, 2) }</pre>;
        }

        return (
            <form>
                {resultJson}
                {properties}
                <button onClick={this.onClickPrintJson} type="button" className="btn btn-primary">Print JSON</button>
            </form>
        );
    }

});

module.exports = Master;
