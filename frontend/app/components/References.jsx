/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewReferenceForm = require("./NewReferenceForm");
var ReferencesOverviewPane = require("./ReferencesOverviewPane");
var ReferencesDepositPane = require("./ReferencesDepositPane");
var ReferencesList = require("./ReferencesList");

// TODO mock data
var fixtures = require("../fixtures");

var References = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TradeStore")], // TODO ReferenceStore

  getInitialState: function() {
    return { newTradeText: "" };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("TradeStore").getState(); // TODO ReferenceStore
  },

  render: function() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-6">
                <ReferencesOverviewPane references={fixtures.references} />
            </div>
            <div className="col-sm-6">
                <ReferencesDepositPane references={fixtures.references} />
            </div>
        </div>
        <NewReferenceForm />
        <h3>Your References</h3>
        <ReferencesList referencesList={fixtures.referencesList} />
      </div>
    );
  }

});

module.exports = References;
