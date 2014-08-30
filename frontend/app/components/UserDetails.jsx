/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserSummaryPane = require("./UserSummaryPane");
var TradeList = require("./TradeList");
var ReferencesList = require("./ReferencesList");

var UserDetails = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("TradeStore", "ReferenceStore", "ContactStore", "UserStore")],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            trades: flux.store("TradeStore").getState(),
            references: flux.store("ReferenceStore").getState(),
            contacts: flux.store("ContactStore").getState(),
            user: flux.store("UserStore").getState()
        };
    },

    render: function() {
        var user;
        if (this.props.params.userId === this.state.user.user.id) {
            user = this.state.user.user;
        } else {
            user = this.state.contacts.contactById[this.props.params.userId];
        }

        if (user) {
            return (
                <div>
                    <UserSummaryPane user={user} tradeList={this.state.trades.tradeList} referencesList={this.state.references.referencesList} />
                    <TradeList title={user.name + "'s Active Trades"} trades={this.state.trades} user={this.state.user.user} />
                    <ReferencesList title={user.name + "'s References"} references={this.state.references} />
                </div>
            );
        } else {
            return (
                <h3>User not found</h3>
            );
        }
    }
});

module.exports = UserDetails;
