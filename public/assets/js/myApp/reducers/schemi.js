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

        case 'EDIT_IN_FORM': // action.path, action.value
            var stateTemp = Immutable.fromJS(state);
            action.path.unshift('formData');

            stateTemp = stateTemp.setIn(action.path, action.value);

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