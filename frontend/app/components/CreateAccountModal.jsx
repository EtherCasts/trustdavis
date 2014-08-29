/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var Button = require('react-bootstrap/Button');
var Modal = require('react-bootstrap/Modal');

// XXX should be FluxChildMixin, but then flux object doesn't get passed along somehow

var CreateAccountModal = React.createClass({
    mixins: [FluxMixin],

    handleHide: function() {
        // will hide when the account is created
    },

    render: function() {
        return this.transferPropsTo(
            <Modal title="Create Account" animation={false} closeButton={false} onRequestHide={this.handleHide}>
                <div className="modal-body">
                    <p>What is the name for your TrustDavis account?</p>
                    <input type="text" className="form-control" placeholder="name" ref="name" />
                </div>
                <div className="modal-footer">
                    <Button onClick={this.handleSave} bsStyle="primary">Create Account</Button>
                </div>
            </Modal>
        );
    },

    handleSave: function() {
        var name = this.refs.name.getDOMNode().value.trim();
        if (!name) {
            return;
        }
        this.getFlux().actions.user.setUserName(name);
    }
});

module.exports = CreateAccountModal;
