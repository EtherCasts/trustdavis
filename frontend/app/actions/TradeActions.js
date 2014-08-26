var constants = require("../constants");

var TradeActions = {
  addTrade: function(trade) {
    this.dispatch(constants.trade.ADD_TRADE, trade);
  }
};

module.exports = TradeActions;
