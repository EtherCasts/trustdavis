/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var UserLink = React.createClass({

    shortIdLength: 8,

    render: function() {
        var shortId = this.props.user.id.substr(0, this.shortIdLength);
        return (
            <Link to="contactDetails" contactId={this.props.user.id}>
                {this.props.showIcon && <span className="glyphicon glyphicon-user"></span>} {this.props.user.name} ({shortId + '\u2026'})
            </Link>
        );
    }
});

module.exports = UserLink;
