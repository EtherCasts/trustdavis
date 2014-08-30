/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Router = require("react-router");
var Link = Router.Link;

var UserLink = React.createClass({
    mixins: [FluxChildMixin, StoreWatchMixin("UserStore")],

    propTypes: {
        id: React.PropTypes.string.isRequired
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            user: flux.store("UserStore").getState()
        };
    },

    shortIdLength: 8,

    render: function() {
        if (!this.props.id) {
            return null;
        }
        var shortId = this.props.id.substr(0, this.shortIdLength);

        return (
            <Link to="contactDetails" contactId={this.props.id}>
                {this.props.showIcon && <span className="glyphicon glyphicon-user"></span>} ({shortId + '\u2026'})
            </Link>
        );
    }
});

module.exports = UserLink;
