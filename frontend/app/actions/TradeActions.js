var TradeConstants = require("../constants/TradeConstants");

var TradeActions = {
  addTrade: function(text) {
    this.dispatch(TradeConstants.ADD_TODO, {text: text});
  },

  toggleTrade: function(todo) {
    this.dispatch(TradeConstants.TOGGLE_TODO, {todo: todo});
  },

  clearTrades: function() {
    this.dispatch(TradeConstants.CLEAR_TODOS);
  }
};

module.exports = TradeActions;
