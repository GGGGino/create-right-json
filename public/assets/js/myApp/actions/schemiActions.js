var store = require('../reducers/schemi'),
    Immutable = require('immutable');

var SchemiActions = {
    createFormData: function() {
        store.dispatch({ type: 'CREATE_FORM_DATA' });
    },

    editInForm: function(path, value) {
        path = path.split("_");
        store.dispatch({ type: 'EDIT_IN_FORM', path: path, value: value });
    },

    addItemToArrayInForm: function(path) {
        path = path.split("_");
        store.dispatch({ type: 'ADD_ARRAY_ITEM_IN_FORM', path: path, value: Immutable.List.of() });
    },

    getDataInForm: function() {
        return Immutable.fromJS(store.getState().formData).toJS();
    },

    createList: function(list) {
        store.dispatch({ type: 'CREATE_LIST', list: list });
    },

    retrieveState: function() {
        return store.getState();
    }
};

module.exports = SchemiActions;