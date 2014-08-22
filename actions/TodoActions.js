var TodoConstants = require("../constants/TodoConstants");

var TodoActions = {
  addTodo: function(text) {
    this.dispatch(TodoConstants.ADD_TODO, {text: text});
  },

  toggleTodo: function(todo) {
    this.dispatch(TodoConstants.TOGGLE_TODO, {todo: todo});
  },

  clearTodos: function() {
    this.dispatch(TodoConstants.CLEAR_TODOS);
  }
};

module.exports = TodoActions;
