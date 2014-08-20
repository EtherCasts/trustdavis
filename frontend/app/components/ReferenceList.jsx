/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ReferenceRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.reference.type}</td>
                <td>{this.props.reference.price} ETH</td>
                <td>{this.props.reference.counterpartyId?<Link to="contacts">{this.props.reference.counterparty}</Link>:'Not claimed'}</td>
                <td>{this.props.reference.status}</td>
                <td>{this.props.reference.expiration}</td>
            </tr>
        );
    }
});

var ReferenceList = React.createClass({
    render: function() {
        var referenceListNodes = this.props.referenceList.map(function (reference) {
            return (
                <ReferenceRow key={reference.id} reference={reference} />
            );
        });
        return (
            <table className="referenceList table table-striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Counterparty</th>
                        <th>Status</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {referenceListNodes}
                </tbody>
            </table>
        );
    }
});

module.exports = ReferenceList;
