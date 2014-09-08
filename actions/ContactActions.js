var constants = require("../constants");

var ContactActions = function(client) {

    this.loadContacts = function() {
        this.dispatch(constants.contact.LOAD_CONTACTS);

        _client.loadContacts(function(contacts) {
            this.dispatch(constants.contact.LOAD_CONTACTS_SUCCESS, contacts);
        }.bind(this), function(error) {
            console.log(error);
            this.dispatch(constants.contact.LOAD_CONTACTS_FAIL, {error: error});
        }.bind(this));
    };

    this.addContact = function(contact) {
        _client.addContact(contact, function() {
            this.dispatch(constants.contact.ADD_CONTACT, contact);
        }.bind(this), function(error) {
            console.log(error);
        }.bind(this));
    };

    this.removeContact = function(contactId) {
        _client.removeContact(contactId, function() {
            this.dispatch(constants.contact.REMOVE_CONTACT, contactId);
        }.bind(this), function(error) {
            console.log(error);
        }.bind(this));
    };

    var _client = client;
};

module.exports = ContactActions;
