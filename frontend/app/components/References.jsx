/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewReferenceForm = require("./NewReferenceForm");
var ReferencesOverviewPane = require("./ReferencesOverviewPane");
var ReferencesDepositPane = require("./ReferencesDepositPane");
var ReferencesList = require("./ReferencesList");

var stats = require("../stats");

var References = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ReferenceStore", "UserStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
        references: flux.store("ReferenceStore").getState(),
        user: flux.store("UserStore").getState()
    };
  },

  render: function() {
    var deposit = this.state.user.user.deposit || 0;
    var summedStats = stats.sumReferenceStats(this.state.references.references);
    var available = deposit - summedStats.lockedLiabilities;

    return (
      <div>
        <div className="row">
            <div className="col-sm-6">
                <ReferencesOverviewPane stats={summedStats} />
            </div>
            <div className="col-sm-6">
                <ReferencesDepositPane deposit={deposit} available={available} />
            </div>
        </div>
        <NewReferenceForm />
        <ReferencesList title="Your References" references={this.state.references} editable={true} />
      </div>
    );
  }

});

module.exports = References;
