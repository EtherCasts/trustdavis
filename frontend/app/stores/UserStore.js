var Fluxxor = require("fluxxor");

var constants = require("../constants");

var UserStore = Fluxxor.createStore({

    initialize: function(options) {
        this.user = options.user;

        this.bindActions(
            constants.user.DEPOSIT, this.onDeposit,
            constants.user.WITHDRAW, this.onWithdraw
        );
    },

    onDeposit: function(payload) {
        // TODO deposit
        console.log("DEPOSIT", payload);
        this.emit(constants.CHANGE_EVENT);
    },

    onWithdraw: function(payload) {
        // TODO withdraw
        console.log("WITHDRAW", payload);
        this.emit(constants.CHANGE_EVENT);
    },

    getState: function() {
        return {
            user: this.user
        };
    }
});

module.exports = UserStore;
