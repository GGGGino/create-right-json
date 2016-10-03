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