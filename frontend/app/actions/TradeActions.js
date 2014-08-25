var constants = require("../constants");

var TradeActions = {
  addTrade: function(text) {
    this.dispatch(constants.trade.ADD_TODO, {text: text});
  },

  toggleTrade: function(todo) {
    this.dispatch(constants.trade.TOGGLE_TODO, {todo: todo});
  },

  clearTrades: function() {
    this.dispatch(constants.trade.CLEAR_TODOS);
  }
};

module.exports = TradeActions;
