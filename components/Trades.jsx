/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewTradeForm = require("./NewTradeForm");
var TradeList = require("./TradeList");

var Trades = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore", "UserStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
        trades: flux.store("TradeStore").getState(),
        user: flux.store("UserStore").getState()
    };
  },

  render: function() {
    return (
      <div>
        <NewTradeForm />
        <TradeList title="Your Active Trades" trades={this.state.trades} user={this.state.user.user} />
      </div>
    );
  }

});

module.exports = Trades;
