/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var moment = require("moment");

var constants = require("../constants");

var NewTradeForm = React.createClass({
  mixins: [FluxChildMixin],
  render: function() {
      var validUntil = moment().add(constants.TRADE_VALID_DAYS, 'days').endOf('day').format("YYYY-MM-DD");
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Trade</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.onSubmitForm}>
                I want to <strong>sell</strong> a
                {' '}
                <select className="form-control input-large" required="required" ref="category">
                  <option value="" disabled="disabled">product / service...</option>
                  <option>product</option>
                  <option>service</option>
                </select> called
                {' '}
                 <input type="text" className="form-control" pattern=".{0,32}" placeholder="description" ref="description" />
                {' '}
                for {constants.CURRENCY} <input type="number" min="0" step="0.01" className="form-control small" placeholder="0.00" ref="price" />
                <p>This offer is <strong>valid for {constants.TRADE_VALID_DAYS} days</strong> (until {validUntil})
                {' '}
                <button type="submit" className="btn btn-default">Create</button></p>
            </form>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
    var type = this.refs.type.getDOMNode().value;
    var category = this.refs.category.getDOMNode().value;
    var description = this.refs.description.getDOMNode().value.trim();
    var price = this.refs.price.getDOMNode().value.trim();
    var expiration = this.refs.expiration.getDOMNode().value.trim();

    if (!type || !category || !description || !price || !expiration) {
      return false;
    }
    this.getFlux().actions.trade.addTrade({
        type: type,
        category: category,
        description: description,
        price: price,
        expiration: expiration
    });

    this.refs.description.getDOMNode().value = '';
    this.refs.price.getDOMNode().value = '';
    this.refs.expiration.getDOMNode().value = '';
    return false;
  }
});

module.exports = NewTradeForm;
