var Fluxxor = require("fluxxor");

var ContactConstants = require("../constants/ContactConstants");

var CHANGE_EVENT = "change";

var ContactStore = Fluxxor.createStore({
  initialize: function(options) {
    this.contacts = options.contacts || [];

    this.bindActions(
      ContactConstants.ADD_CONTACT, this.onAddContact,
      ContactConstants.REMOVE_CONTACT, this.onRemoveContact
    );
  },

  onAddContact: function(payload) {
    this.contacts.push({id: payload.address, name: payload.name});
    this.emit(CHANGE_EVENT);
  },

  onRemoveContact: function(payload) {
    this.contacts = this.contacts.filter(function(contact) {
        return contact.id !== payload.id;
    });
    this.emit(CHANGE_EVENT);
  },

  getState: function() {
    return {
      contacts: this.contacts
    };
  }
});

module.exports = ContactStore;
