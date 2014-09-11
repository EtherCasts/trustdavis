/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var constants = require("../constants");
var ProgressBar = require("./ProgressBar");

var TradeActionButtons = React.createClass({

    mixins: [FluxChildMixin],

    render: function() {
        if (this.props.state === constants.state.NEW || this.props.state === constants.state.ACCEPTED) {
            return (
                <div className="row spacer">
                    <div className="col-xs-4">
                        <button type="button" className="btn btn-default" onClick={this.onCancelButton}>Cancel</button>
                    </div>
                </div>
            );
        } else if (this.props.state === constants.state.INSURED) {
            return (
                <div className="row spacer">
                    <div className="col-xs-4">
                        <button type="button" className="btn btn-success" disabled="disabled">Success</button>
                    </div>
                    <div className="col-xs-4">
                        <button type="button" className="btn btn-danger" disabled="disabled">Fail</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
});

var TradeStatusPane = React.createClass({
    mixins: [FluxChildMixin],

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Status</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-4">
                            Escrow
                        </div>
                        <div className="col-xs-8">
                            <ProgressBar pct={this.props.trade.escrowPct || 0} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            Insurance
                        </div>
                        <div className="col-xs-8">
                            <ProgressBar pct={this.props.trade.insurancePct || 0} />
                        </div>
                    </div>
                    <div className="row spacer">
                        <div className="col-xs-4">
                            Status
                        </div>
                        <div className="col-xs-8">
                            {this.props.trade.state}
                        </div>
                    </div>
                    <TradeActionButtons />
                </div>
            </div>
        );
    },

    onCancelButton: function() {
        this.getFlux().actions.trade.cancelTrade(this.props.trade);
    }
});

module.exports = TradeStatusPane;
