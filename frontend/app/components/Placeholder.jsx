/** @jsx React.DOM */

var React = require("react");

var Placeholder = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Placeholder - {this.props.name}</h1>
      </div>
    );
  }
});

module.exports = Placeholder;
