/** @jsx React.DOM */

var React = require("react");

var UserLink = require("./UserLink");

// TODO dropdown javascript

var ReferenceRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><UserLink user={this.props.reference.trader} /></td>
                <td>{this.props.reference.maxLiability} ETH</td>
                <td>{this.props.reference.premiumPct} %</td>
                <td>{this.props.reference.lockedLiability} ETH</td>
                <td>
                    <div className="dropdown">
                      <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                        Action <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Edit</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Delete</a></li>
                      </ul>
                    </div>
                </td>
            </tr>
        );
    }
});

var ReferencesList = React.createClass({
    render: function() {
        var referencesListNodes = this.props.referencesList.map(function(reference) {
            return (
                <ReferenceRow key={reference.id} reference={reference} />
            );
        });
        return (
            <table className="referenceList table table-striped">
                <thead>
                    <tr>
                        <th>Trader</th>
                        <th>Max Liability</th>
                        <th>Premium</th>
                        <th>Locked Liability</th>
                        <th>Action</th>
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
