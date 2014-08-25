var ContactConstants = require("../constants/ContactConstants");

var ContactActions = {
  addContact: function(contact) {
    this.dispatch(ContactConstants.ADD_CONTACT, contact);
  },

  removeContact: function(contact) {
    this.dispatch(ContactConstants.REMOVE_CONTACT, contact);
  }
};

module.exports = ContactActions;
