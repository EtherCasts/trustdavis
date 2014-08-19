var Fluxxor = require("fluxxor");

var TradeConstants = require("../constants/TradeConstants");

var CHANGE_EVENT = "change";

var TradeStore = Fluxxor.createStore({
  initialize: function() {
    this.todos = [];

    this.bindActions(
      TradeConstants.ADD_TODO, this.onAddTrade,
      TradeConstants.TOGGLE_TODO, this.onToggleTrade,
      TradeConstants.CLEAR_TODOS, this.onClearTrades
    );
  },

  onAddTrade: function(payload) {
    this.todos.push({text: payload.text, complete: false});
    this.emit(CHANGE_EVENT);
  },

  onToggleTrade: function(payload) {
    payload.todo.complete = !payload.todo.complete;
    this.emit(CHANGE_EVENT);
  },

  onClearTrades: function() {
    this.todos = this.todos.filter(function(todo) {
      return !todo.complete;
    });
    this.emit(CHANGE_EVENT);
  },

  getState: function() {
    return {
      todos: this.todos
    };
  }
});

module.exports = TradeStore;
