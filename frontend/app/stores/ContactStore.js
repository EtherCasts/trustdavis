var Fluxxor = require("fluxxor");
var _ = require("lodash");

var constants = require("../constants");

var ContactStore = Fluxxor.createStore({
    initialize: function(options) {
        this.contacts = options.contacts || {};

        this.bindActions(
            constants.contact.ADD_CONTACT, this.onAddContact,
            constants.contact.REMOVE_CONTACT, this.onRemoveContact
        );

        this.setMaxListeners(1024); // prevent "possible EventEmitter memory leak detected"
    },

    onAddContact: function(payload) {
        this.contacts[payload.address] = {
            id: payload.address,
            name: payload.name
        };
        this.emit(constants.CHANGE_EVENT);
    },

    onRemoveContact: function(payload) {
        delete this.contacts[payload.id];
        this.emit(constants.CHANGE_EVENT);
    },

    getState: function() {
        return {
            contactList: _.values(this.contacts),
            contactById: this.contacts
        };
    }
});

module.exports = ContactStore;
