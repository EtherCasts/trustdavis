/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

//var TradeItem = require("./TradeItem");

var Trades = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")],

  getInitialState: function() {
    return { newTradeText: "" };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState();
  },

  render: function() {
    return (
      <div>
        <h1>Trades</h1>
        <ul>
          {this.state.todos.map(function(todo, i) {
            //return <li key={i}><TradeItem todo={todo} /></li>;
            return <li key={i}>TradeItem</li>;
          })}
        </ul>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" size="30" placeholder="New Trade"
                 value={this.state.newTradeText}
                 onChange={this.handleTradeTextChange} />
          <input type="submit" value="Add Trade" />
        </form>
        <button onClick={this.clearCompletedTrades}>Clear Completed</button>
      </div>
    );
  },

  handleTradeTextChange: function(e) {
    this.setState({newTradeText: e.target.value});
  },

  onSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.newTradeText.trim()) {
      this.getFlux().actions.addTrade(this.state.newTradeText);
      this.setState({newTradeText: ""});
    }
  },

  clearCompletedTrades: function(e) {
    this.getFlux().actions.clearTrades();
  }
});

module.exports = Trades;
