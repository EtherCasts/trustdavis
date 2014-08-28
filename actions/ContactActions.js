var constants = require("../constants");

var FirebaseClient = require("../clients/FirebaseClient");

var ContactActions = {

  loadContacts: function() {
    FirebaseClient.load(function(contacts) {
      this.dispatch(constants.contact.LOAD_CONTACTS, contacts);
    }.bind(this), function(error) {
      console.log(error);
    }.bind(this));
  },

  addContact: function(contact) {
    FirebaseClient.set(contact, function() {
      this.dispatch(constants.contact.ADD_CONTACT, contact);
    }.bind(this), function(error) {
      console.log(error);
    }.bind(this));
  },

  removeContact: function(contact) {
    FirebaseClient.remove(contact, function() {
      this.dispatch(constants.contact.REMOVE_CONTACT, contact);
    }.bind(this), function(error) {
      console.log(error);
    }.bind(this));
  },

  renameContact: function(contact) {
    FirebaseClient.set(contact, function() {
      this.dispatch(constants.contact.RENAME_CONTACT, contact);
    }.bind(this), function(error) {
      console.log(error);
    }.bind(this));
  }
};

module.exports = ContactActions;
