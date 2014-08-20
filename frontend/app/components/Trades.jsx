/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewTradeForm = require("./NewTradeForm");
var TradeList = require("./TradeList");

require("../css/style.css");

// TODO mock data
var tradeList = [{
    id: 'f70097659f329a09',
    type: 'buy',
    description: 'Garden gnome',
    price: 12,
    counterparty: 'Andrew',
    counterpartyId: '91c24063',
    status: 'new',
    expiration: '31/12/2014'
}, {
    id: 'e92113a5cb209c12',
    type: 'sell',
    description: 'Lawnmower',
    price: 66,
    counterparty: undefined,
    counterpartyId: undefined,
    status: 'new',
    expiration: '15/10/2014'
}];

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
        <TradeList tradeList={tradeList} />
      </div>
    );
  }

});

module.exports = Trades;
