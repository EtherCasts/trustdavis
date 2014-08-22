/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewContactForm = require("./NewContactForm");
var ContactList = require("./ContactList");

// TODO mock data
var fixtures = require("../fixtures");

var Contacts = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")], // TODO ContactStore

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState();
  },

  render: function() {
    return (
      <div>
        <NewContactForm />
        <h3>Your Contacts</h3>
        <ContactList contactList={fixtures.contactList} />
      </div>
    );
  }

});

module.exports = Contacts;
