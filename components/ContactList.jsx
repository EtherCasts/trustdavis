/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var Router = require("react-router");
var Link = Router.Link;

var ActionDropDown = require("./ActionDropDown");

var ContactRow = React.createClass({
    mixins: [FluxChildMixin],
    render: function() {
        return (
            <tr>
                <td><Link to="contactDetails" contactId={this.props.contact.id}>{this.props.contact.name}</Link></td>
                <td>{this.props.contact.id}</td>
                <td><ActionDropDown key={this.props.contact.id} handleDelete={this.handleDelete} /></td>
            </tr>
        );
    },
    handleDelete: function(e) {
        e.preventDefault();
        this.getFlux().actions.contact.removeContact(this.props.contact);
    }
});

var ContactList = React.createClass({
    render: function() {
        var contactListNodes = this.props.contactList.map(function (contact) {
            return (
                <ContactRow key={contact.id} contact={contact} />
            );
        }.bind(this));
        return (
            <table className="contactList table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contactListNodes}
                </tbody>
            </table>
        );
    }
});

module.exports = ContactList;
