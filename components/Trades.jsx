/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewTradeForm = require("./NewTradeForm");
var TradeList = require("./TradeList");

// TODO mock data
var fixtures = require("../fixtures");

var Trades = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")],

  getInitialState: function() {
    return { newTradeText: "" };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState();
  },

  render: function() {
    return (
      <div>
        <NewTradeForm />
        <h3>Your Active Trades</h3>
        <TradeList tradeList={fixtures.tradeList} />
      </div>
    );
  }

});

module.exports = Trades;
