/** @jsx React.DOM */

var React = require("react");

var NavBar = require("./NavBar");


var TrustDavisApp = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar user={this.props.user} />
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

module.exports = TrustDavisApp;
