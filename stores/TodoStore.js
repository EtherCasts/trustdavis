var Fluxxor = require("fluxxor");

var TodoConstants = require("../constants/TodoConstants");

var CHANGE_EVENT = "change";

var TodoStore = Fluxxor.createStore({
  initialize: function() {
    this.todos = [];

    this.bindActions(
      TodoConstants.ADD_TODO, this.onAddTodo,
      TodoConstants.TOGGLE_TODO, this.onToggleTodo,
      TodoConstants.CLEAR_TODOS, this.onClearTodos
    );
  },

  onAddTodo: function(payload) {
    this.todos.push({text: payload.text, complete: false});
    this.emit(CHANGE_EVENT);
  },

  onToggleTodo: function(payload) {
    payload.todo.complete = !payload.todo.complete;
    this.emit(CHANGE_EVENT);
  },

  onClearTodos: function() {
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

module.exports = TodoStore;
