/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var UserSummaryPane = require("./UserSummaryPane");
var TradeList = require("./TradeList");
var ReferencesList = require("./ReferencesList");

var UserDetails = React.createClass({
    mixins: [FluxChildMixin],

    render: function() {
        var user;
        if (this.props.params.userId === this.props.user.user.id) {
            user = this.props.user.user;
        } else {
            user = this.props.contacts.contactById[this.props.params.userId];
        }

        if (user) {
            return (
                <div>
                    <UserSummaryPane user={user} tradeList={this.props.trades.tradeList} referencesList={this.props.references.referencesList} />
                    <TradeList title={user.name + "'s Active Trades"} trades={this.props.trades} user={this.props.user.user} />
                    <ReferencesList title={user.name + "'s References"} references={this.props.references} />
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
