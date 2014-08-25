var keyMirror = require('react/lib/keyMirror');

module.exports = {
    CHANGE_EVENT: "change",
    contact: keyMirror({
        ADD_CONTACT: null,
        REMOVE_CONTACT: null}),
    todo: keyMirror({
        ADD_TODO: null,
        TOGGLE_TODO: null,
        CLEAR_TODOS: null})
};
