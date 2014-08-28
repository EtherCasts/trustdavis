/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NavBar = require("./NavBar");


var TrustDavisApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ReferenceStore", "UserStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("UserStore").getState();
  },

  render: function() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <this.props.activeRouteHandler/>
      </div>
    );
  },

  componentDidMount: function() {
    this.getFlux().actions.contact.loadContacts();
  },
});

module.exports = TrustDavisApp;
