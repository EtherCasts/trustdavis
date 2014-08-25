var Fluxxor = require("fluxxor");

var constants = require("../constants");

var ContactStore = Fluxxor.createStore({
  initialize: function(options) {
    this.contacts = options.contacts || [];

    this.bindActions(
      constants.contact.ADD_CONTACT, this.onAddContact,
      constants.contact.REMOVE_CONTACT, this.onRemoveContact
    );
  },

  onAddContact: function(payload) {
    this.contacts.push({id: payload.address, name: payload.name});
    this.emit(constants.CHANGE_EVENT);
  },

  onRemoveContact: function(payload) {
    this.contacts = this.contacts.filter(function(contact) {
        return contact.id !== payload.id;
    });
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      contacts: this.contacts
    };
  }
});

module.exports = ContactStore;
