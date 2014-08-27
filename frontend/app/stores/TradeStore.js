var Fluxxor = require("fluxxor");
var _ = require("lodash");

var constants = require("../constants");
var utils = require("../utils");

var TradeStore = Fluxxor.createStore({

    initialize: function(options) {
        this.trades = options.trades || {};

        this.bindActions(
            constants.trade.ADD_TRADE, this.onAddTrade
        );
    },

    onAddTrade: function(payload) {
        var id = utils.randomId();
        this.trades[id] = {
            id: id,
            type: payload.type,
            category: payload.category,
            description: payload.description,
            price: payload.price,
            expiration: payload.expiration,
            counterparty: payload.counterparty || undefined,
            escrowPct: 0,
            insurancePct: 0,
            status: payload.status || 'new',
            statusText: payload.statusText || 'new',
            references: []
        };
        this.emit(constants.CHANGE_EVENT);
    },

    getState: function() {
        return {
            tradeList: _.values(this.trades),
            tradeById: this.trades
        };
    }
});

module.exports = TradeStore;
