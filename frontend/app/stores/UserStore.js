var Fluxxor = require("fluxxor");

var constants = require("../constants");

var UserStore = Fluxxor.createStore({

    initialize: function(options) {
        this.user = options.user;

        this.bindActions(
            constants.user.DEPOSIT, this.onDeposit,
            constants.user.WITHDRAW, this.onWithdraw
        );

        this.setMaxListeners(1024); // prevent "possible EventEmitter memory leak detected"
    },

    onDeposit: function(payload) {
        console.log("DEPOSIT", payload);
        if (payload.amount > 0) {
            this.user.deposit += payload.amount;
        }
        this.emit(constants.CHANGE_EVENT);
    },

    onWithdraw: function(payload) {
        console.log("WITHDRAW", payload);
        if (payload.amount <= this.user.deposit) {
            this.user.deposit -= payload.amount;
        }
        this.emit(constants.CHANGE_EVENT);
    },

    getState: function() {
        return {
            user: this.user
        };
    }
});

module.exports = UserStore;
