var constants = require("../constants");

var UserActions = function(client) {

    this.loadUsers = function() {
        this.dispatch(constants.user.LOAD_USERS, {currentUserId: _client.UID()});

        _client.loadUsers(function(users) {
            this.dispatch(constants.user.LOAD_USERS_SUCCESS, {users: users});
        }.bind(this), function(error) {
            console.log(error);
            this.dispatch(constants.user.LOAD_USERS_FAIL, {error: error});
        }.bind(this));
    };

    this.listenCurrentUser = function() {
        _client.listenCurrentUser(function(currentUser) {
            this.dispatch(constants.user.USER_CHANGED, currentUser);
        }.bind(this));
    };

    this.registerUser = function(name) {
        var trimmedName = name.trim().toLowerCase();
        _client.setUserName(trimmedName, function(name) {
          this.dispatch(constants.user.REGISTER_USER, {name: name});
        }.bind(this), function(error) {
          console.log(error);
        }.bind(this));
    };

    this.deposit = function(amount) {
        _client.depositUser(amount, function(amount) {
          this.dispatch(constants.user.DEPOSIT, {amount: amount});
        }.bind(this), function(error) {
          console.log(error);
        }.bind(this));
    };

    this.withdraw = function(amount) {
        _client.withdrawUser(amount, function(amount) {
          this.dispatch(constants.user.WITHDRAW, {amount: amount});
        }.bind(this), function(error) {
          console.log(error);
        }.bind(this));
    };

    var _client = client;
};

module.exports = UserActions;
