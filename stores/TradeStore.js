var Fluxxor = require("fluxxor");

var constants = require("../constants");

var TradeStore = Fluxxor.createStore({
  initialize: function() {
    this.todos = [];

    this.bindActions(
      constants.trade.ADD_TODO, this.onAddTrade,
      constants.trade.TOGGLE_TODO, this.onToggleTrade,
      constants.trade.CLEAR_TODOS, this.onClearTrades
    );
  },

  onAddTrade: function(payload) {
    this.todos.push({text: payload.text, complete: false});
    this.emit(constants.CHANGE_EVENT);
  },

  onToggleTrade: function(payload) {
    payload.todo.complete = !payload.todo.complete;
    this.emit(constants.CHANGE_EVENT);
  },

  onClearTrades: function() {
    this.todos = this.todos.filter(function(todo) {
      return !todo.complete;
    });
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      todos: this.todos
    };
  }
});

module.exports = TradeStore;
