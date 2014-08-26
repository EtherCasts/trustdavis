/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewContactForm = require("./NewContactForm");
var ContactList = require("./ContactList");

var Contacts = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ContactStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ContactStore").getState();
  },

  render: function() {
    return (
      <div>
        <NewContactForm />
        <h3>Your Contacts</h3>
        <ContactList contactList={this.state.contacts} />
      </div>
    );
  }

});

module.exports = Contacts;
