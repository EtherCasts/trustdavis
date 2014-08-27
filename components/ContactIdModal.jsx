/** @jsx React.DOM */

var React = require("react");

var Button = require('react-bootstrap/Button');
var Modal = require('react-bootstrap/Modal');

var ContactIdModal = React.createClass({
    render: function() {
        return this.transferPropsTo(
            <Modal title="Contact ID" animation={false}>
                <div className="modal-body">
                    <p>This is the contact ID, the Ethereum public key of the person:</p>
                    <pre>
                        {this.props.contactId}
                    </pre>
                </div>
                <div className="modal-footer">
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </div>
            </Modal>
        );
    }
});

module.exports = ContactIdModal;
