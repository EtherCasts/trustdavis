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
        <h3>Your Active Trades {this.state.trades.loading && <i className="fa fa-spinner fa-spin"></i>}</h3>
        {this.state.trades.error && <div className="alert alert-danger" role="alert"><strong>Error!</strong> {this.state.trades.error}</div>}
        <TradeList tradeList={this.state.trades.tradeList} user={this.state.user.user} />
      </div>
    );
  }

});

module.exports = Trades;
