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
        <h3>Your Contacts {this.state.loading && <i className="fa fa-spinner fa-spin"></i>}</h3>
        {this.state.error && <div className="alert alert-danger" role="alert"><strong>Error!</strong> {this.state.error}</div>}
        <ContactList contactList={this.state.contactList} />
      </div>
    );
  }

});

module.exports = Contacts;
