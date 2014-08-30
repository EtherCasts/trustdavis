/** @jsx React.DOM */

// XXX rename to UserDetails?

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ContactSummaryPane = require("./ContactSummaryPane");
var TradeList = require("./TradeList");
var ReferencesList = require("./ReferencesList");

var ContactDetails = React.createClass({
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
        var contact;
        if (this.props.params.contactId === this.state.user.user.id) {
            contact = this.state.user.user;
        } else {
            contact = this.state.contacts.contactById[this.props.params.contactId];
        }

        if (contact) {
            return (
                <div>
                    <ContactSummaryPane contact={contact} tradeList={this.state.trades.tradeList} referencesList={this.state.references.referencesList} />
                    <TradeList title={contact.name + "'s Active Trades"} trades={this.state.trades} user={this.state.user.user} />
                    <ReferencesList title={contact.name + "'s References"} references={this.state.references} />
                </div>
            );
        } else {
            return (
                <h3>Contact not found</h3>
            );
        }
    }

});

module.exports = ContactDetails;
