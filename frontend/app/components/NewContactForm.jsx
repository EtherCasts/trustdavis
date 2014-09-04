/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var constants = require("../constants");

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
                <input type="text" className="form-control" pattern={constants.VALID_USERNAME_PATTERN} placeholder="name" ref="name" />
                {' '}
                <button type="submit" className="btn btn-default">Add</button>
            </form>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim().toLowerCase();

    if (!name) {
      return false;
    }

    var contactId = this.props.users.usersByName[name];
    if (contactId) {
        this.getFlux().actions.contact.addContact({id: contactId});
        this.refs.name.getDOMNode().value = '';
    } else {
        // TODO
        console.log("User not found");
    }
    return false;
  }
});

module.exports = NewContactForm;
