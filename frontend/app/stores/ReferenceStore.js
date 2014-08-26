var Fluxxor = require("fluxxor");

var constants = require("../constants");
var utils = require("../utils");

var ReferenceStore = Fluxxor.createStore({

  initialize: function(options) {
    this.references = options.references || [];

    this.bindActions(
      constants.reference.ADD_REFERENCE, this.onAddReference,
      constants.reference.REMOVE_REFERENCE, this.onRemoveReference
    );
  },

  onAddReference: function(payload) {
    this.references.push({
        id: utils.randomId(),
        trader: payload.trader,
        maxLiability: payload.maxLiability,
        premiumPct: payload.premiumPct,
        lockedLiability: 0
    });
    this.emit(constants.CHANGE_EVENT);
  },

  onRemoveReference: function(payload) {
    this.references = this.references.filter(function(reference) {
        return reference.id !== payload.id;
    });
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      references: this.references
    };
  }
});

module.exports = ReferenceStore;
