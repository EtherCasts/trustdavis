/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NavBar = require("./NavBar");
var CreateAccountModal = require("./CreateAccountModal");

var TrustDavisApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ReferenceStore", "UserStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
        user: flux.store("UserStore").getState()
    };
  },

  render: function() {
    return (
      <div>
        <NavBar user={this.state.user} />
        {this.state.user.createAccount && <CreateAccountModal flux={this.getFlux()} />}
        <this.props.activeRouteHandler />
      </div>
    );
  },

  componentDidMount: function() {
    this.getFlux().actions.user.loadUser();
    this.getFlux().actions.contact.loadContacts();
    this.getFlux().actions.trade.loadTrades();
    this.getFlux().actions.reference.loadReferences();
  },
});

module.exports = TrustDavisApp;
