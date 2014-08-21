/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TradeSummaryPane = require("./TradeSummaryPane");
var TradeStatusPane = require("./TradeStatusPane");
var ReferenceList = require("./ReferenceList");

require("../css/style.css");

// TODO mock data
var fixtures = require("../fixtures");

var TradeDetails = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")],

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState();
  },

  render: function() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-6">
                <TradeSummaryPane trade={fixtures.trade} user={this.props.user} />
            </div>
            <div className="col-sm-6">
                <TradeStatusPane trade={fixtures.trade} />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-6">
                <h3 className="visible-xs-block">References</h3>
                <h3 className="hidden-xs">References for this trade</h3>
            </div>
            <div className="col-xs-6 text-right">
                <button type="button" className="btn btn-default" disabled="disabled">Insure this trade</button>
            </div>
        </div>
        <ReferenceList referenceList={fixtures.referenceList} />
      </div>
    );
  }

});

module.exports = TradeDetails;
