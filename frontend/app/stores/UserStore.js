var Fluxxor = require("fluxxor");

var constants = require("../constants");

var UserStore = Fluxxor.createStore({

    initialize: function(options) {
        this.user = options.user || {};
        this.createAccount = false;
        this.loading = false;
        this.error = null;

        this.bindActions(
            constants.user.LOAD_USER, this.onLoadUser,
            constants.user.LOAD_USER_SUCCESS, this.onLoadUserSuccess,
            constants.user.LOAD_USER_FAIL, this.onLoadUserFail,
            constants.user.SET_USER_NAME, this.onSetUserName,
            constants.user.DEPOSIT, this.onDeposit,
            constants.user.WITHDRAW, this.onWithdraw
        );

        this.setMaxListeners(1024); // prevent "possible EventEmitter memory leak detected"
    },

    onLoadUser: function() {
        this.user = {name: '[unknown]'};
        this.createAccount = false;
        this.loading = true;
        this.error = null;
        this.emit(constants.CHANGE_EVENT);
    },

    onLoadUserSuccess: function(payload) {
        this.user = payload;
        if (!payload.name) {
            this.createAccount = true;
        }
        this.loading = false;
        this.error = null;
        this.emit(constants.CHANGE_EVENT);
    },

    onLoadUserFail: function(payload) {
        this.loading = false;
        this.error = payload.error;
        this.emit(constants.CHANGE_EVENT);
    },

    onSetUserName: function(payload) {
        this.user.name = payload.name;
        this.createAccount = false;
        this.emit(constants.CHANGE_EVENT);
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
            user: this.user,
            loading: this.loading,
            error: this.error,
            createAccount: this.createAccount
        };
    }
});

module.exports = UserStore;
