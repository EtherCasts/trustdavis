/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var NewContactForm = React.createClass({
  mixins: [FluxChildMixin],
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Contact</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.onSubmitForm}>
                I want to add the contact{' '}
                <input type="text" className="form-control" pattern="\w{1,32}" placeholder="name" ref="name" />
                {' '}with the address{' '}
                <input type="text" className="form-control" pattern="[0-9a-fA-F]{64}" placeholder="ethereum address" ref="address" />
                {' '}
                <button type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var address = this.refs.address.getDOMNode().value.trim();

    if (!name || !address) {
      return false;
    }
    this.getFlux().actions.contact.addContact({name: name, id: address});

    this.refs.name.getDOMNode().value = '';
    this.refs.address.getDOMNode().value = '';
    return false;
  }
});

module.exports = NewContactForm;
