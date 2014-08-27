/** @jsx React.DOM */

var React = require("react");

var UserLink = require("./UserLink");

var TradeSummaryPane = React.createClass({
  render: function() {
    var isBuyer = this.props.trade.buyerId === this.props.user.id;
    var isSeller = this.props.trade.sellerId === this.props.user.id;

    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Trade Summary</h3>
          </div>
          <div className="panel-body">
            <table className="table table-condensed table-striped">
                <tbody>
                    <tr>
                        <td>Trade ID</td>
                        <td>{this.props.trade.id + '\u2026 '}
                        <button type="button" className="btn btn-default btn-xs">
                            <i className="fa fa-files-o fa-lg"></i>
                        </button></td>
                    </tr>
                    <tr>
                        <td>Buyer {isBuyer && '(you)'}</td>
                        <td><UserLink id={this.props.trade.buyerId} /></td>
                    </tr>
                    <tr>
                        <td>Seller {isSeller && '(you)'}</td>
                        <td><UserLink id={this.props.trade.sellerId} /></td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{this.props.trade.category}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{this.props.trade.description}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{this.props.trade.price} ETH</td>
                    </tr>
                    <tr>
                        <td>Valid Until</td>
                        <td>{this.props.trade.expiration}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
    );
  }
});

module.exports = TradeSummaryPane;
