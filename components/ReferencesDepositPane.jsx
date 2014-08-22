/** @jsx React.DOM */

var React = require("react");
var ProgressBar = require("./ProgressBar");

var ReferencesDepositPane = React.createClass({
  render: function() {
    var available = this.props.references.deposit - this.props.references.lockedLiabilities;
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Deposit</h3>
          </div>
          <div className="panel-body">
            <div className="row">
                <div className="col-xs-6">
                    Deposit
                </div>
                <div className="col-xs-6">
                    {this.props.references.deposit} ETH
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    Available
                </div>
                <div className="col-xs-6">
                    {available} ETH
                </div>
            </div>
            <div className="row spacer">
                <div className="col-xs-6">
                    <button type="button" className="btn btn-default">Deposit</button>
                </div>
                <div className="col-xs-6">
                    <button type="button" className="btn btn-default">Withdraw</button>
                </div>
            </div>
          </div>
        </div>
    );
  },
  onSubmitForm: function(e) {
    e.preventDefault();
  }
});

module.exports = ReferencesDepositPane;
