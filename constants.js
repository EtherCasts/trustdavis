var keyMirror = require('react/lib/keyMirror');

module.exports = {
    CHANGE_EVENT: "change",
    contact: keyMirror({
        ADD_CONTACT: null,
        REMOVE_CONTACT: null,
        RENAME_CONTACT: null
    }),
    trade: keyMirror({
        ADD_TRADE: null
    }),
    reference: keyMirror({
        ADD_REFERENCE: null,
        REMOVE_REFERENCE: null
    }),
    user: keyMirror({
        DEPOSIT: null,
        WITHDRAW: null
    })
};
