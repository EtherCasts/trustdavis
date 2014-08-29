var constants = require("../constants");

var UserActions = function(client) {

    this.loadUser = function() {
        this.dispatch(constants.user.LOAD_USER);

        _client.loadUser(function(user) {
            this.dispatch(constants.user.LOAD_USER_SUCCESS, user);
        }.bind(this), function(error) {
            console.log(error);
            this.dispatch(constants.user.LOAD_USER_FAIL, {error: error});
        }.bind(this));
    };

    this.setUserName = function(name) {
        _client.setUserName(name, function(name) {
          this.dispatch(constants.user.SET_USER_NAME, {name: name});
        }.bind(this), function(error) {
          console.log(error);
        }.bind(this));
    };

    this.deposit = function(amount) {
        this.dispatch(constants.user.DEPOSIT, {amount: amount});
    };

    this.withdraw = function(amount) {
        this.dispatch(constants.user.WITHDRAW, {amount: amount});
    };

    var _client = client;
};

module.exports = UserActions;
