/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var UserLink = require("./UserLink");
var ActionDropDown = require("./ActionDropDown");

var ReferenceRow = React.createClass({
    mixins: [FluxChildMixin],
    render: function() {
        return (
            <tr>
                <td><UserLink user={this.props.reference.trader} /></td>
                <td>{this.props.reference.maxLiability} ETH</td>
                <td>{this.props.reference.premiumPct} %</td>
                <td>{this.props.reference.lockedLiability} ETH</td>
                {this.props.editable && <td><ActionDropDown key={this.props.reference.id} handleDelete={this.handleDelete} /></td>}
            </tr>
        );
    },
    handleDelete: function(e) {
        e.preventDefault();
        this.getFlux().actions.reference.removeReference(this.props.reference);
    }
});

var ReferencesList = React.createClass({
    render: function() {
        var referencesListNodes = this.props.referencesList.map(function(reference) {
            return (
                <ReferenceRow key={reference.id} reference={reference} editable={this.props.editable} />
            );
        }.bind(this));
        return (
            <table className="referenceList table table-striped">
                <thead>
                    <tr>
                        <th>Trader</th>
                        <th>Max Liability</th>
                        <th>Premium</th>
                        <th>Locked Liability</th>
                        {this.props.editable && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {referencesListNodes}
                </tbody>
            </table>
        );
    }
});

module.exports = ReferencesList;
