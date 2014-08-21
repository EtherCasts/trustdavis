/** @jsx React.DOM */

var React = require("react");

var UserLink = require("./UserLink");

var ReferenceRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><UserLink user={this.props.reference.insurer} /></td>
                <td>{this.props.reference.liability} ETH</td>
                <td>{this.props.reference.premiumPct} %</td>
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
                        <th>Insurer</th>
                        <th>Liability</th>
                        <th>Premium</th>
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
