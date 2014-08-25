/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ActionDropDown = require("./ActionDropDown");

var ContactRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><Link to="contactDetails" contactId={this.props.contact.id}>{this.props.contact.name}</Link></td>
                <td>{this.props.contact.id}</td>
                <td><ActionDropDown key={this.props.contact.id} /></td>
            </tr>
        );
    }
});

var ContactList = React.createClass({
    render: function() {
        var contactListNodes = this.props.contactList.map(function (contact) {
            return (
                <ContactRow key={contact.id} contact={contact} />
            );
        });
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
