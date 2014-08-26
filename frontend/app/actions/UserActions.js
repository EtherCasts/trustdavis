var constants = require("../constants");

var UserActions = {
  deposit: function(amount) {
    this.dispatch(constants.user.DEPOSIT, {amount: amount});
  },
  withdraw: function(amount) {
    this.dispatch(constants.user.WITHDRAW, {amount: amount});
  }
};

module.exports = UserActions;
