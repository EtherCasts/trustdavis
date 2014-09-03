var keyMirror = require('react/lib/keyMirror');

module.exports = {
    CHANGE_EVENT: "change",
    contact: keyMirror({
        LOAD_CONTACTS: null,
        LOAD_CONTACTS_SUCCESS: null,
        LOAD_CONTACTS_FAIL: null,
        ADD_CONTACT: null,
        REMOVE_CONTACT: null,
        RENAME_CONTACT: null
    }),
    trade: keyMirror({
        LOAD_TRADES: null,
        LOAD_TRADES_SUCCESS: null,
        LOAD_TRADES_FAIL: null,
        ADD_TRADE: null
    }),
    reference: keyMirror({
        LOAD_REFERENCES: null,
        LOAD_REFERENCES_SUCCESS: null,
        LOAD_REFERENCES_FAIL: null,
        ADD_REFERENCE: null,
        REMOVE_REFERENCE: null
    }),
    user: keyMirror({
        LOAD_USERS: null,
        LOAD_USERS_SUCCESS: null,
        LOAD_USERS_FAIL: null,
        REGISTER_USER: null,
        DEPOSIT: null,
        WITHDRAW: null
    })
};
