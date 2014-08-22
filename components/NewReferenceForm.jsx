/** @jsx React.DOM */

var React = require("react");

var NewReferenceForm = React.createClass({
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Reference</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.onSubmitForm}>
                I want to insure <input type="text" className="form-control" placeholder="person" />
                {' '}
                with a maximum liability of
                {' '}
                <input type="number" min="0" step="0.0001" className="form-control small" placeholder="0.0000" /> ETH
                {' '}
                for a premium of <input type="number" min="0" step="0.1" className="form-control small" placeholder="0.0" /> %
                {' '}
                <button type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
  }
});

module.exports = NewReferenceForm;
