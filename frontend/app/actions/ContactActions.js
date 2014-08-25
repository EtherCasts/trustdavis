var constants = require("../constants");

var ContactActions = {
  addContact: function(contact) {
    this.dispatch(constants.contacts.ADD_CONTACT, contact);
  },

  removeContact: function(contact) {
    this.dispatch(constants.contacts.REMOVE_CONTACT, contact);
  }
};

module.exports = ContactActions;
