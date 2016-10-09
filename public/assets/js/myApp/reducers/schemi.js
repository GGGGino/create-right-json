var Redux = require('redux');

function counter(state, action) {

    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'CREATE_LIST':
            state = {};
            state.listaSchemi = action.list;
            return state;
        case 'LIST':
            return state;

        default:
            return state;
    }
}

var store = Redux.createStore(counter);

module.exports = store;