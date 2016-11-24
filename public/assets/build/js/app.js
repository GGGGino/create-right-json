(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    SchemiJsonTable = require('./myApp/components/SchemiJsonTable.react.jsx'),
    AddJsonTemplate = require('./myApp/components/AddJsonTemplate.react.jsx'),
    SchemiActions = require('./myApp/actions/schemiActions'),
    $ = require('jquery');

fetch('api/getJsons').then(function (response) {
    return response.json();
}).then(function (myJson) {
    SchemiActions.createList(myJson);

    ReactDOM.render(React.createElement(SchemiJsonTable, null), document.getElementById('elencoJsonGeneral'));
});

$('.addJsonTemplate').on('click', function (e) {
    ReactDOM.render(React.createElement(AddJsonTemplate, null), document.getElementById('schemaDetail'));
});

},{"./myApp/actions/schemiActions":2,"./myApp/components/AddJsonTemplate.react.jsx":3,"./myApp/components/SchemiJsonTable.react.jsx":7,"jquery":"jquery","react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
var store = require('../reducers/schemi'),
    Immutable = require('immutable');

var SchemiActions = {
    createFormData: function () {
        store.dispatch({ type: 'CREATE_FORM_DATA' });
    },

    editInForm: function (path, value) {
        path = path.split("_");
        store.dispatch({ type: 'EDIT_IN_FORM', path: path, value: value });
    },

    addItemToArrayInForm: function (path) {
        path = path.split("_");
        store.dispatch({ type: 'ADD_ARRAY_ITEM_IN_FORM', path: path, value: Immutable.List.of() });
    },

    getDataInForm: function () {
        return Immutable.fromJS(store.getState().formData).toJS();
    },

    createList: function (list) {
        store.dispatch({ type: 'CREATE_LIST', list: list });
    },

    retrieveState: function () {
        return store.getState();
    }
};

module.exports = SchemiActions;

},{"../reducers/schemi":16,"immutable":"immutable"}],3:[function(require,module,exports){
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
    displayName: 'AddJsonTemplate',


    getInitialState: function () {
        return {
            nome: "Prova",
            json: ""
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickAddJsonTemplate: function (event) {
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
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            console.log(myJson);
        });
    },

    onTextAreaChange: function (event) {
        this.setState({
            nome: this.state.nome,
            json: event.target.value
        });
    },

    onInputAreaChange: function (event) {
        this.setState({
            nome: event.target.value,
            json: this.state.json
        });
    },

    /**
     * @return {object}
     */
    render: function () {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                'Edit Schema'
            ),
            React.createElement(
                'button',
                { onClick: this.onClickAddJsonTemplate, type: 'button', className: 'btn btn-primary' },
                'Save'
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    null,
                    'Nome Schema'
                ),
                React.createElement('input', { type: '', text: true, onChange: this.onInputChange, value: this.state.name })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('textarea', { onChange: this.onTextAreaChange, name: 'jsonTemplate', value: this.state.json })
            )
        );
    }

});

module.exports = AddJsonTemplate;

},{"../actions/schemiActions":2,"./schemi/Master.react.jsx":12,"react":"react"}],4:[function(require,module,exports){
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

var SchemaDetailBox = React.createClass({
    displayName: 'SchemaDetailBox',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                'View Schema'
            ),
            React.createElement(
                'pre',
                null,
                JSON.stringify(this.props.schema, null, 2)
            )
        );
    }

});

module.exports = SchemaDetailBox;

},{"../actions/schemiActions":2,"react":"react"}],5:[function(require,module,exports){
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
    JSONEditor = require('jsoneditor');

var SchemaEditBox = React.createClass({
    displayName: 'SchemaEditBox',


    getInitialState: function () {
        return {
            editor: null,
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var element = this.refs.editJson,
            options = {
            mode: 'tree'
        };
        this.state.editor = new JSONEditor(element, options);
        this.state.editor.set(this.state.schema);
    },

    componentDidUpdate: function () {
        this.state.editor.set(this.state.schema);
    },

    onClickEditSchema: function () {
        fetch('api/editJson', {
            method: 'PUT',
            body: JSON.stringify({
                nome: this.props.nomeSchema,
                schema: this.state.editor.get()
            }),
            cache: 'default',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            console.log(myJson);
        });
    },

    componentWillReceiveProps: function (nextProps) {
        this.state.schema = nextProps.schema;
        this.setState(this.state);
    },

    /**
     * @return {object}
     */
    render: function () {

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                'Edit Schema'
            ),
            React.createElement(
                'button',
                { onClick: this.onClickEditSchema, type: 'button', className: 'btn btn-primary' },
                'Save'
            ),
            React.createElement('div', { ref: 'editJson' })
        );
    }

});

module.exports = SchemaEditBox;

},{"../actions/schemiActions":2,"jsoneditor":"jsoneditor","react":"react"}],6:[function(require,module,exports){
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
    displayName: 'SchemaDetailBox',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function () {
        SchemiActions.createFormData();

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                'Create Schema From Template'
            ),
            React.createElement(MasterSchema, { schema: this.props.schema })
        );
    }

});

module.exports = SchemaDetailBox;

},{"../actions/schemiActions":2,"./schemi/Master.react.jsx":12,"react":"react"}],7:[function(require,module,exports){
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
var SingleSchemaTable = require('./SingleSchemaTable.react.jsx');

var SchemiJsonTable = React.createClass({
    displayName: 'SchemiJsonTable',


    getInitialState: function () {
        return SchemiActions.retrieveState();
    },

    componentDidMount: function () {
        var questo = this;

        fetch('api/getJsons').then(function (response) {
            return response.json();
        }).then(function (myJson) {
            SchemiActions.createList(myJson);
            questo.setState(myJson);
        });
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function () {
        var schemi = [],
            allSchemi = SchemiActions.retrieveState();

        for (var key in allSchemi.listaSchemi) {
            var schema = {
                nome: allSchemi.listaSchemi[key]
            },
                chiaveChild = parseInt(Math.random() * 1000) + "";

            schemi.push(React.createElement(SingleSchemaTable, { key: chiaveChild, schema: schema }));
        }

        return React.createElement(
            'table',
            { className: 'table table-striped' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        'Schema'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                schemi
            )
        );
    }

});

module.exports = SchemiJsonTable;

},{"../actions/schemiActions":2,"./SingleSchemaTable.react.jsx":8,"react":"react"}],8:[function(require,module,exports){
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
    ReactDOM = require('react-dom'),
    SchemiActions = require('../actions/schemiActions'),
    SchemaDetailBox = require('./SchemaDetailBox.react.jsx'),
    SchemaFormBox = require('./SchemaFormBox.react.jsx'),
    SchemaEditBox = require('./SchemaEditBox.react.jsx');

var SingleSchemaTable = React.createClass({
    displayName: 'SingleSchemaTable',


    getInitialState: function () {
        return this.props.schema;
    },

    componentDidMount: function () {
        //SchemiStore.addChangeListener(this._onChange);

    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickLoadSchema: function (typeView) {
        var formData = new FormData(),
            nomeSchema = this.props.schema.nome;

        formData.set('nome', nomeSchema);

        fetch('api/getJson', {
            method: 'POST',
            body: formData,
            cache: 'default'
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {

            switch (typeView) {
                case "view":
                    ReactDOM.render(React.createElement(SchemaDetailBox, { schema: myJson }), document.getElementById('schemaDetail'));
                    break;

                case "add":
                    ReactDOM.render(React.createElement(SchemaFormBox, { schema: myJson }), document.getElementById('schemaDetail'));
                    break;

                case "edit":
                    ReactDOM.render(React.createElement(SchemaEditBox, { nomeSchema: nomeSchema, schema: myJson }), document.getElementById('schemaDetail'));
                    break;
            }
        });
    },

    /**
     * @return {object}
     */
    render: function () {
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                this.props.schema.nome,
                React.createElement('span', { onClick: this.onClickLoadSchema.bind(this, 'add'), className: 'glyphicon glyphicon-plus text-right pull-right p-l-10', 'aria-hidden': 'true' }),
                React.createElement('span', { onClick: this.onClickLoadSchema.bind(this, 'edit'), className: 'glyphicon glyphicon-pencil text-right pull-right p-l-10', 'aria-hidden': 'true' }),
                React.createElement('span', { onClick: this.onClickLoadSchema.bind(this, 'view'), className: 'glyphicon glyphicon-zoom-in text-right pull-right p-l-10', 'aria-hidden': 'true' })
            )
        );
    }

});

module.exports = SingleSchemaTable;

},{"../actions/schemiActions":2,"./SchemaDetailBox.react.jsx":4,"./SchemaEditBox.react.jsx":5,"./SchemaFormBox.react.jsx":6,"react":"react","react-dom":"react-dom"}],9:[function(require,module,exports){
var React = require('react');

module.exports = {

    cleanSchema: function (schema) {
        if ('$schema' in schema) delete schema["$schema"];

        return schema;
    },

    recognizeSchema: function (key, pieceOfSchema, profondita) {

        if (pieceOfSchema.type === "string") {
            if ('enum' in pieceOfSchema) {
                var SelectInput = require('./schemi/Select.react.jsx');
                return React.createElement(SelectInput, { key: key, keyField: key, schema: pieceOfSchema, profondita: profondita });
            } else {
                var StringInput = require('./schemi/String.react.jsx');
                return React.createElement(StringInput, { key: key, keyField: key, schema: pieceOfSchema, profondita: profondita });
            }
        }

        if (pieceOfSchema.type === "boolean") {
            var CheckboxInput = require('./schemi/Checkbox.react.jsx');
            return React.createElement(CheckboxInput, { key: key, keyField: key, schema: pieceOfSchema, profondita: profondita });
        }

        if (pieceOfSchema.type === "object") {
            var ObjectInput = require('./schemi/Object.react.jsx');
            return React.createElement(ObjectInput, { key: key, keyField: key, schema: pieceOfSchema, profondita: profondita });
        }

        if (pieceOfSchema.type === "array") {
            var ArrayInput = require('./schemi/Array.react.jsx');
            return React.createElement(ArrayInput, { key: key, keyField: key, schema: pieceOfSchema, profondita: profondita });
        }
    },

    completeKey: function (parent, id) {
        var prefix = "";

        if (parent) prefix = parent + "_";

        return prefix + id;
    }

};

},{"./schemi/Array.react.jsx":10,"./schemi/Checkbox.react.jsx":11,"./schemi/Object.react.jsx":13,"./schemi/Select.react.jsx":14,"./schemi/String.react.jsx":15,"react":"react"}],10:[function(require,module,exports){
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

var ArrayField = React.createClass({
    displayName: 'ArrayField',


    getInitialState: function () {
        return {
            numberOfSchemas: 0,
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    onClickAddSchema: function () {
        var numero = this.state.numberOfSchemas + 1;

        var path = Utils.completeKey(this.props.profondita, this.props.keyField);
        SchemiActions.addItemToArrayInForm(path);

        this.setState({
            numberOfSchemas: numero,
            schema: this.state.schema
        });
    },

    /**
     * @return {object}
     */
    render: function () {
        var properties = [],
            divStyle = {
            marginLeft: '25px'
        };

        for (var i = 0; i < this.state.numberOfSchemas; i++) {
            var key = this.props.keyField + "_" + i,
                profondita = Utils.completeKey(this.props.profondita, i);

            properties.push(Utils.recognizeSchema(key, this.state.schema.items, this.props.profondita));
        }

        return React.createElement(
            'div',
            { className: 'contArray' },
            React.createElement(
                'h4',
                null,
                this.props.schema.id
            ),
            React.createElement(
                'div',
                { className: 'contArrayProperties', style: divStyle },
                properties
            ),
            React.createElement(
                'button',
                { onClick: this.onClickAddSchema, type: 'button', className: 'btn btn-primary' },
                'Add'
            )
        );
    }

});

module.exports = ArrayField;

},{"../../actions/schemiActions":2,"../Utils.jsx":9,"react":"react"}],11:[function(require,module,exports){
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

var CheckboxField = React.createClass({
    displayName: 'CheckboxField',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onChange: function () {
        this.setState({ isChecked: !this.state.isChecked });
    },

    /**
     * @return {object}
     */
    render: function () {
        var style = {
            width: '200px'
        },
            defaultValue = this.props.schema.default,
            idLabel = null,
            key = Utils.completeKey(this.props.profondita, this.props.keyField);

        if (this.props.schema.id !== undefined) idLabel = this.props.schema.id;

        return React.createElement(
            'div',
            { key: key, className: 'form-group' },
            React.createElement(
                'div',
                { className: 'form-inline' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', {
                        type: 'checkbox',
                        defaultChecked: defaultValue
                    }),
                    idLabel
                )
            )
        );
    }

});

module.exports = CheckboxField;

},{"../Utils.jsx":9,"react":"react"}],12:[function(require,module,exports){
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
    displayName: 'Master',


    getInitialState: function () {
        var resultJson = SchemiActions.getDataInForm();

        return {
            schema: this.props.schema,
            showResultJson: false,
            resultJson: resultJson
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    onClickPrintJson: function () {
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
    render: function () {
        var cleanedSchema = Utils.cleanSchema(this.props.schema),
            properties = [],
            profondita = 0,
            resultJson = null;

        for (var propName in cleanedSchema.properties) {
            var key = cleanedSchema.properties[propName].id;
            properties.push(Utils.recognizeSchema(key, cleanedSchema.properties[propName], null));
        }

        if (this.state.showResultJson) {
            resultJson = React.createElement(
                'pre',
                null,
                JSON.stringify(this.state.resultJson, null, 2)
            );
        }

        return React.createElement(
            'form',
            null,
            resultJson,
            properties,
            React.createElement(
                'button',
                { onClick: this.onClickPrintJson, type: 'button', className: 'btn btn-primary' },
                'Print JSON'
            )
        );
    }

});

module.exports = Master;

},{"../../actions/schemiActions":2,"../Utils.jsx":9,"react":"react"}],13:[function(require,module,exports){
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
    displayName: 'ObjectField',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function () {
        var cleanedSchema = Utils.cleanSchema(this.props.schema),
            properties = [],
            divStyle = {
            marginLeft: '25px'
        };

        for (var propName in cleanedSchema.properties) {
            var key = cleanedSchema.properties[propName].id,
                profondita = Utils.completeKey(this.props.profondita, this.props.keyField);

            properties.push(Utils.recognizeSchema(key, cleanedSchema.properties[propName], profondita));
        }

        return React.createElement(
            'div',
            { className: 'contObject' },
            React.createElement(
                'h4',
                null,
                this.props.schema.id
            ),
            React.createElement(
                'div',
                { className: 'contPropObject', style: divStyle },
                properties
            )
        );
    }

});

module.exports = ObjectField;

},{"../Utils.jsx":9,"react":"react"}],14:[function(require,module,exports){
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
    displayName: 'SelectField',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    handleChange: function (value) {
        var path = Utils.completeKey(this.props.profondita, this.props.keyField);
        SchemiActions.editInForm(path, value.target.value);
    },

    /**
     * @return {object}
     */
    render: function () {
        var style = {
            width: '200px'
        },
            options = [],
            idLabel = null,
            key = Utils.completeKey(this.props.profondita, this.props.keyField);

        if (this.props.schema.id !== undefined) idLabel = React.createElement(
            'label',
            null,
            this.props.schema.id,
            ':\xA0\xA0'
        );

        for (var enu in this.props.schema.enum) {
            options.push(React.createElement(
                'option',
                { key: enu, value: this.props.schema.enum[enu] },
                this.props.schema.enum[enu]
            ));
        }

        return React.createElement(
            'div',
            { key: key, className: 'form-group' },
            React.createElement(
                'div',
                { className: 'form-inline' },
                idLabel,
                React.createElement(
                    'select',
                    { className: 'form-control', onChange: this.handleChange },
                    options
                )
            )
        );
    }

});

module.exports = SelectField;

},{"../../actions/schemiActions":2,"../Utils.jsx":9,"react":"react"}],15:[function(require,module,exports){
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

var StringField = React.createClass({
    displayName: 'StringField',


    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },

    componentDidMount: function () {
        var questo = this;
    },

    componentWillUnmount: function () {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    handleChange: function (value) {
        var path = Utils.completeKey(this.props.profondita, this.props.keyField);
        SchemiActions.editInForm(path, value.target.value);
    },

    /**
     * @return {object}
     */
    render: function () {
        var style = {
            width: '200px'
        },
            defaultValue = this.props.schema.default,
            idLabel = null,
            key = Utils.completeKey(this.props.profondita, this.props.keyField);

        if (this.props.schema.id !== undefined) idLabel = React.createElement(
            'label',
            null,
            this.props.schema.id,
            ':\xA0\xA0'
        );

        return React.createElement(
            'div',
            { key: key, className: 'form-group' },
            React.createElement(
                'div',
                { className: 'form-inline' },
                idLabel,
                React.createElement('input', { type: 'text', onChange: this.handleChange, defaultValue: defaultValue, style: style, className: 'form-control' })
            )
        );
    }

});

module.exports = StringField;

},{"../../actions/schemiActions":2,"../Utils.jsx":9,"react":"react"}],16:[function(require,module,exports){
var Redux = require('redux'),
    Immutable = require('immutable');

function counter(state, action) {

    if (typeof state === 'undefined') {
        return {};
    }

    switch (action.type) {
        case 'CREATE_FORM_DATA':
            state.formData = {};
            return state;

        case 'EDIT_IN_FORM':
            // action.path, action.value
            var stateTemp = Immutable.fromJS(state);
            action.path.unshift('formData');

            stateTemp = stateTemp.setIn(action.path, action.value);

            return stateTemp.toJS();

        case 'ADD_ARRAY_ITEM_IN_FORM':
            // action.path, action.value
            var stateTemp = Immutable.fromJS(state);
            action.path.unshift('formData');

            if (!stateTemp.getIn(action.path)) stateTemp = stateTemp.setIn(action.path, Immutable.List.of());

            return stateTemp.toJS();

        case 'CREATE_LIST':
            state.listaSchemi = action.list;
            return state;

        case 'LIST':
            return state;

        default:
            return state;
    }
}

var store = Redux.createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;

},{"immutable":"immutable","redux":"redux"}]},{},[2,16,1,3,4,5,6,10,11,12,13,14,15,7,8,9]);
