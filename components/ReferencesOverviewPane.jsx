/** @jsx React.DOM */

var React = require("react");

var ReferencesOverviewPane = React.createClass({
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Overview</h3>
          </div>
          <div className="panel-body">
            <table className="table table-condensed table-striped">
                <tbody>
                    <tr>
                        <td>Max Liabilities</td>
                        <td>{this.props.references.maxLiabilities} ETH</td>
                    </tr>
                    <tr>
                        <td>Locked Liabilities</td>
                        <td>{this.props.references.lockedLiabilities} ETH</td>
                    </tr>
                    <tr>
                        <td>Insured Trades</td>
                        <td>{this.props.references.insuredTrades}</td>
                    </tr>
                    <tr>
                        <td>Claims</td>
                        <td>{this.props.references.claims}</td>
                    </tr>
                    <tr>
                        <td>Profit</td>
                        <td>{this.props.references.profit} ETH</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
    );
  }
});

module.exports = ReferencesOverviewPane;
