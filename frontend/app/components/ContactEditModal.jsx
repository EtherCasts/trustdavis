/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var Button = require('react-bootstrap/Button');
var Modal = require('react-bootstrap/Modal');

var ContactEditModal = React.createClass({
    mixins: [FluxMixin],
    render: function() {
        return this.transferPropsTo(
            <Modal title="Edit Contact" animation={false}>
                <div className="modal-body">
                    <p>What is the new name for contact "{this.props.contact.name}"?</p>
                    <input type="text" className="form-control" placeholder="name" ref="name" defaultValue={this.props.contact.name} />
                </div>
                <div className="modal-footer">
                    <Button onClick={this.props.onRequestHide}>Cancel</Button>
                    <Button onClick={this.handleSave} bsStyle="primary">Save</Button>
                </div>
            </Modal>
        );
    },
    handleSave: function() {
        console.log("SAVE");
        var name = this.refs.name.getDOMNode().value.trim();
        this.getFlux().actions.contact.renameContact({id: this.props.contact.id, name: name});
        this.props.onRequestHide();
    }
});

module.exports = ContactEditModal;
