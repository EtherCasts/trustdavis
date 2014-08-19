/** @jsx React.DOM */

var React = require("react");

var NavBar = require("./NavBar");


var TrustDavisApp = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar userName="Mike" userId="1a73636d" />
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

module.exports = TrustDavisApp;
