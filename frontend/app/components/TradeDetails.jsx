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
var trade = {
    id: 'f70097659f329a09',
    type: 'buy',
    buyer: 'Mike',
    buyerId: '1a73636d',
    seller: 'Andrew',
    sellerId: '91c24063',
    description: 'Garden gnome',
    price: 12.0,
    expiration: '31/12/2014',
    escrowPct: 100.0,
    insurancePct: 50.0,
    statusText: 'awaiting insurance'
};

var referenceList = [{
    id: 'f7009765',
    insurer: 'John',
    insurerId: 'f7009765',
    liability: 6,
    premium: 10.0
}];

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
                <TradeSummaryPane trade={trade} user={this.props.user} />
            </div>
            <div className="col-sm-6">
                <TradeStatusPane trade={trade} />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-6">
                <h3>References for this trade</h3>
            </div>
            <div className="col-xs-6 text-right">
                <button type="button" className="btn btn-default" disabled="disabled">Insure this trade</button>
            </div>
        </div>
        <ReferenceList referenceList={referenceList} />
      </div>
    );
  }

});

module.exports = TradeDetails;
