var Fluxxor = require("fluxxor");

var constants = require("../constants");

var TradeStore = Fluxxor.createStore({
  initialize: function() {
    this.trades = [];

    this.bindActions(
      constants.trade.ADD_TRADE, this.onAddTrade
    );
  },

  onAddTrade: function(payload) {
    this.trades.push({
        id: payload.id,
        type: payload.type,
        category: payload.category,
        description: payload.description,
        price: payload.price,
        expiration: payload.expiration,
        counterparty: payload.counterparty || undefined,
        status: payload.status || 'new'
    });
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      trades: this.trades
    };
  }
});

module.exports = TradeStore;
