(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var TodoApp = require('./todo/components/TodoApp.react.jsx');
var SchemiJsonTable = require('./myApp/components/SchemiJsonTable.react.jsx');
var SchemaDetailBox = require('./myApp/components/SchemaDetailBox.react.jsx');
var SchemiActions = require('./myApp/actions/schemiActions');
var store = require('./myApp/reducers/schemi');

React.render(
  TodoApp(null),
  document.getElementById('todoapp')
);

React.render(
    SchemiJsonTable(null),
    document.getElementById('elencoJsonGeneral')
);

React.render(
    SchemaDetailBox(null),
    document.getElementById('schemaDetail')
);

},{"./myApp/actions/schemiActions":2,"./myApp/components/SchemaDetailBox.react.jsx":3,"./myApp/components/SchemiJsonTable.react.jsx":4,"./myApp/reducers/schemi":6,"./todo/components/TodoApp.react.jsx":12,"react":"react"}],2:[function(require,module,exports){
var store = require('../reducers/schemi');

var SchemiActions = {
    createList: function(list) {
        store.dispatch({ type: 'CREATE_LIST', list: list });
    },
    retrieveState: function() {
        return store.getState();
    }
};

module.exports = SchemiActions;
},{"../reducers/schemi":6}],3:[function(require,module,exports){
/** @jsx React.DOM *//**
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

var SchemiJsonTable = React.createClass({displayName: 'SchemiJsonTable',

    getInitialState: function() {
        return SchemiActions.retrieveState();
    },

    componentDidMount: function() {
        var questo = this;

        fetch('api/getJsons')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                SchemiActions.createList(myJson);
                questo.setState(myJson);
            });
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            React.DOM.div(null, 
                "Dettaglio Schema"
            )
        );
    }

});

module.exports = SchemiJsonTable;

},{"../actions/schemiActions":2,"react":"react"}],4:[function(require,module,exports){
/** @jsx React.DOM *//**
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
var SingleSchemaTable = React.createFactory(require('./SingleSchemaTable.react.jsx'));

var SchemiJsonTable = React.createClass({displayName: 'SchemiJsonTable',

    getInitialState: function() {
        return SchemiActions.retrieveState();
    },

    componentDidMount: function() {
        var questo = this;

        fetch('api/getJsons')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                SchemiActions.createList(myJson);
                questo.setState(myJson);
            });
    },

    componentWillUnmount: function() {
        //SchemiStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var schemi = [],
            allSchemi = SchemiActions.retrieveState();

        for (var key in allSchemi.listaSchemi) {
            var schema = {
                nome: allSchemi.listaSchemi[key]
            };
            schemi.push(SingleSchemaTable({schema: schema}));
        }

        return (
            React.DOM.table({class: "table table-striped"}, 
                React.DOM.thead(null, 
                    React.DOM.tr(null, 
                        React.DOM.th(null, "Schema")
                    )
                ), 
                React.DOM.tbody(null, 
                    schemi
                )
            )
        );
    }

});

module.exports = SchemiJsonTable;

},{"../actions/schemiActions":2,"./SingleSchemaTable.react.jsx":5,"react":"react"}],5:[function(require,module,exports){
/** @jsx React.DOM *//**
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

var SingleSchemaTable = React.createClass({displayName: 'SingleSchemaTable',

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
            React.DOM.tr(null, 
                React.DOM.td(null, 
                    React.DOM.a(null, this.props.schema)
                )
            )
        );
    }

});

module.exports = SingleSchemaTable;

},{"../actions/schemiActions":2,"react":"react"}],6:[function(require,module,exports){
var Redux = require('redux');

var primoStato = {
        listaSchemi: [
            "primo",
            "secondo",
            "terzo"
        ]
    };

function counter(state, action) {

    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'CREATE_LIST':
            if("list" in action) {
                state.listaSchemi = action.list;
            }else{
                state = primoStato;
            }
            return state;
            break;
        case 'LIST':
            return state;

        default:
            return state;
    }
}

var store = Redux.createStore(counter);
store.dispatch({ type: 'CREATE_LIST' });

module.exports = store;
},{"redux":"redux"}],7:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = TodoActions;

},{"../constants/TodoConstants":16,"../dispatcher/AppDispatcher":17}],8:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({displayName: 'Footer',

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        React.DOM.button({
          id: "clear-completed", 
          onClick: this._onClearCompletedClick}, 
          "Clear completed (", completed, ")"
        );
    }

  	return (
      React.DOM.footer({id: "footer"}, 
        React.DOM.span({id: "todo-count"}, 
          React.DOM.strong(null, 
            itemsLeft
          ), 
          itemsLeftPhrase
        ), 
        clearCompletedButton
      )
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  }

});

module.exports = Footer;

},{"../actions/TodoActions":7,"react":"react"}],9:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react.jsx');

var Header = React.createClass({displayName: 'Header',

  /**
   * @return {object}
   */
  render: function() {
    return (
      React.DOM.header({id: "header"}, 
        React.DOM.h1(null, "todos"), 
        TodoTextInput({
          id: "new-todo", 
          placeholder: "What needs to be done?", 
          onSave: this._onSave}
        )
      )
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }

  }

});

module.exports = Header;

},{"../actions/TodoActions":7,"./TodoTextInput.react.jsx":14,"react":"react"}],10:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react.jsx');

var MainSection = React.createClass({displayName: 'MainSection',

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(TodoItem({key: key, todo: allTodos[key]}));
    }

    return (
      React.DOM.section({id: "main"}, 
        React.DOM.input({
          id: "toggle-all", 
          type: "checkbox", 
          onChange: this._onToggleCompleteAll, 
          checked: this.props.areAllComplete ? 'checked' : ''}
        ), 
        React.DOM.label({htmlFor: "toggle-all"}, "Mark all as complete"), 
        React.DOM.ul({id: "todo-list"}, todos)
      )
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;

},{"../actions/TodoActions":7,"./TodoItem.react.jsx":13,"react":"react"}],11:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react.jsx');

var classNames = require('classnames');

var TodoItem = React.createClass({displayName: 'TodoItem',

    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isEditing: false
        };
    },

    /**
     * @return {object}
     */
    render: function() {
        var todo = this.props.todo;

        var input;
        if (this.state.isEditing) {
            input =
                TodoTextInput({
                    className: "edit", 
                    onSave: this._onSave, 
                    value: todo.text}
                );
        }

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (
            React.DOM.li({
                className: classNames({
                    'completed': todo.complete,
                    'editing': this.state.isEditing
                }), 
                key: todo.id}, 
                React.DOM.div({className: "view"}, 
                    React.DOM.input({
                        className: "toggle", 
                        type: "checkbox", 
                        checked: todo.complete, 
                        onChange: this._onToggleComplete}
                    ), 
                    React.DOM.label({onDoubleClick: this._onDoubleClick}, 
            todo.text
                    ), 
                    React.DOM.button({className: "destroy", onClick: this._onDestroyClick})
                ), 
        input
            )
        );
    },

    _onToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },

    _onDoubleClick: function() {
        this.setState({isEditing: true});
    },

    /**
     * Event handler called within TodoTextInput.
     * Defining this here allows TodoTextInput to be used in multiple places
     * in different ways.
     * @param  {string} text
     */
    _onSave: function(text) {
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    },

    _onDestroyClick: function() {
        TodoActions.destroy(this.props.todo.id);
    }

});

module.exports = TodoItem;

},{"../actions/TodoActions":7,"./TodoTextInput.react.jsx":14,"classnames":"classnames","react":"react"}],12:[function(require,module,exports){
/** @jsx React.DOM *//**
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

var Footer = require('./Footer.react.jsx');
var Header = require('./Header.react.jsx');
var MainSection = require('./MainSection.react.jsx');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({displayName: 'TodoApp',

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      React.DOM.div(null, 
        Header(null), 
        MainSection({
          allTodos: this.state.allTodos, 
          areAllComplete: this.state.areAllComplete}
        ), 
        Footer({allTodos: this.state.allTodos})
      )
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;

},{"../stores/TodoStore":19,"./Footer.react.jsx":8,"./Header.react.jsx":9,"./MainSection.react.jsx":10,"react":"react"}],13:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react.jsx');

var classNames = require('classnames');

var TodoItem = React.createClass({displayName: 'TodoItem',

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        TodoTextInput({
          className: "edit", 
          onSave: this._onSave, 
          value: todo.text}
        );
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      React.DOM.li({
        className: classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        }), 
        key: todo.id}, 
        React.DOM.div({className: "view"}, 
          React.DOM.input({
            className: "toggle", 
            type: "checkbox", 
            checked: todo.complete, 
            onChange: this._onToggleComplete}
          ), 
          React.DOM.label({onDoubleClick: this._onDoubleClick}, 
            todo.text
          ), 
          React.DOM.button({className: "destroy", onClick: this._onDestroyClick})
        ), 
        input
      )
    );
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoItem;

},{"../actions/TodoActions":7,"./TodoTextInput.react.jsx":14,"classnames":"classnames","react":"react"}],14:[function(require,module,exports){
/** @jsx React.DOM *//**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({displayName: 'TodoTextInput',

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      React.DOM.input({
        className: this.props.className, 
        id: this.props.id, 
        placeholder: this.props.placeholder, 
        onBlur: this._save, 
        onChange: this._onChange, 
        onKeyDown: this._onKeyDown, 
        value: this.state.value, 
        autoFocus: true}
      )
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = TodoTextInput;

},{"react":"react"}],15:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
    TODO_CREATE: null,
    TODO_COMPLETE: null,
    TODO_DESTROY: null,
    TODO_DESTROY_COMPLETED: null,
    TODO_TOGGLE_COMPLETE_ALL: null,
    TODO_UNDO_COMPLETE: null,
    TODO_UPDATE_TEXT: null
});

},{"keymirror":"keymirror"}],16:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null,
  TODO_DESTROY_COMPLETED: null,
  TODO_TOGGLE_COMPLETE_ALL: null,
  TODO_UNDO_COMPLETE: null,
  TODO_UPDATE_TEXT: null
});

},{"keymirror":"keymirror"}],17:[function(require,module,exports){
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();

},{"flux":"flux"}],18:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _schemi = {
    primo: {
        id: 123,
        complete: false,
        text: "blablabla"
    },
    secondo: {
        id: 1234,
        complete: false,
        text: "Secondo schema"
    }
};

var SchemiStore = assign({}, EventEmitter.prototype, {

    /**
     * Tests whether all the remaining TODO items are marked as completed.
     * @return {boolean}
     */
    areAllComplete: function() {
        for (var id in _schemi) {
            if (!_schemi[id].complete) {
                return false;
            }
        }
        return true;
    },

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _schemi;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                updateAll({complete: false});
            } else {
                updateAll({complete: true});
            }
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_COMPLETE:
            update(action.id, {complete: true});
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted();
            TodoStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = SchemiStore;

},{"../constants/TodoConstants":16,"../dispatcher/AppDispatcher":17,"events":20,"object-assign":"object-assign"}],19:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;

},{"../constants/TodoConstants":16,"../dispatcher/AppDispatcher":17,"events":20,"object-assign":"object-assign"}],20:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[2,6,7,15,16,17,18,19,1,3,4,5,8,9,10,11,12,13,14]);
