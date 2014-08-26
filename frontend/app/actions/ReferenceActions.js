var constants = require("../constants");

var ReferenceActions = {
  addReference: function(reference) {
    this.dispatch(constants.reference.ADD_REFERENCE, reference);
  }
};

module.exports = ReferenceActions;
