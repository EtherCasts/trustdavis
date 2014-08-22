/** @jsx React.DOM */

var React = require("react");

var NewTradeForm = React.createClass({
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Trade</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.onSubmitForm}>
                I want to <select className="form-control input-large">
                  <option>sell</option>
                  <option>buy</option>
                </select> a
                {' '}
                <select className="form-control input-large" required="required">
                  <option value="" disabled="disabled" selected="selected">product / service...</option>
                  <option>product</option>
                  <option>service</option>
                </select> called
                {' '}
                 <input type="text" className="form-control" placeholder="description" />
                {' '}
                for <input type="number" min="0" step="0.0001" className="form-control small" placeholder="0.0000" /> ETH.
                <p>This offer is valid until <input type="date" className="form-control medium" placeholder="date" />
                {' '}
                <button type="submit" className="btn btn-default">Create</button></p>
            </form>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
  }
});

module.exports = NewTradeForm;
