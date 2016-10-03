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