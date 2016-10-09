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
