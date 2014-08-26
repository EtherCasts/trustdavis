/** @jsx React.DOM */

// XXX rename to UserDetails?

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ContactSummaryPane = require("./ContactSummaryPane");
var TradeList = require("./TradeList");
var ReferencesList = require("./ReferencesList");

var ContactDetails = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore", "ReferenceStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
        trades: flux.store("TradeStore").getState(),
        references: flux.store("ReferenceStore").getState()
    };
  },

  render: function() {
    return (
      <div>
        <ContactSummaryPane user={this.props.user} tradeList={this.state.trades.trades} referencesList={this.state.references.references} />
        <h3>{this.props.user.name}'s Trades</h3>
        <TradeList tradeList={this.state.trades.trades} user={this.props.user} />
        <h3>{this.props.user.name}'s References</h3>
        <ReferencesList referencesList={this.state.references.references} />
      </div>
    );
  }

});

module.exports = ContactDetails;
