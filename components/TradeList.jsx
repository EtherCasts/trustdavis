/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var UserLink = require("./UserLink");

var TradeRow = React.createClass({
    render: function() {
        var isBuyer = this.props.trade.buyer && (this.props.trade.buyer.id === this.props.user.id);
        var isSeller = this.props.trade.seller && (this.props.trade.seller.id === this.props.user.id);
        var counterparty;

        if (isBuyer) {
            counterparty = this.props.trade.seller;
        } else if (isSeller) {
            counterparty = this.props.trade.buyer;
        }

        return (
            <tr>
                <td>{this.props.trade.type}</td>
                <td>{this.props.trade.category}</td>
                <td><Link to="tradeDetails" tradeId={this.props.trade.id}>
                {this.props.trade.description}</Link></td>
                <td>{this.props.trade.price} ETH</td>
                <td>{counterparty ? <UserLink user={counterparty} /> : 'Not claimed'}</td>
                <td>{this.props.trade.status}</td>
                <td>{this.props.trade.expiration}</td>
            </tr>
        );
    }
});

var TradeList = React.createClass({
    render: function() {
        var tradeListNodes = this.props.tradeList.map(function (trade) {
            return (
                <TradeRow key={trade.id} trade={trade} user={this.props.user} />
            );
        }.bind(this));
        return (
            <table className="tradeList table table-striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Counterparty</th>
                        <th>Status</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {tradeListNodes}
                </tbody>
            </table>
        );
    }
});

module.exports = TradeList;
