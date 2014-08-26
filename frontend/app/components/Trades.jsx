/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewTradeForm = require("./NewTradeForm");
var TradeList = require("./TradeList");

var Trades = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState();
  },

  render: function() {
    return (
      <div>
        <NewTradeForm />
        <h3>Your Active Trades</h3>
        <TradeList tradeList={this.state.trades} user={this.props.user} />
      </div>
    );
  }

});

module.exports = Trades;
