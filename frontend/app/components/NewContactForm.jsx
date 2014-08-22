/** @jsx React.DOM */

var React = require("react");

var NewContactForm = React.createClass({
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Contact</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.onSubmitForm}>
                I want to add the contact{' '}
                <input type="text" className="form-control" placeholder="name" />
                {' '}with the address{' '}
                <input type="text" className="form-control" placeholder="ethereum address" />
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

module.exports = NewContactForm;
