/** @jsx React.DOM */

// XXX rename to UserDetails?

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ContactSummaryPane = require("./ContactSummaryPane");
var TradeList = require("./TradeList");
var ReferencesList = require("./ReferencesList");

// TODO mock data
var fixtures = require("../fixtures");

var ContactDetails = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")], // TODO ContactStore

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState(); // TODO ContactStore
  },

  render: function() {
    return (
      <div>
        <ContactSummaryPane user={this.props.user} tradeList={this.state.trades} referencesList={fixtures.referencesList} />
        <h3>{this.props.user.name}'s Trades</h3>
        <TradeList tradeList={this.state.trades} />
        <h3>{this.props.user.name}'s References</h3>
        <ReferencesList referencesList={fixtures.referencesList} />
      </div>
    );
  }

});

module.exports = ContactDetails;
