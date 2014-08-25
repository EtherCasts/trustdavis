/** @jsx React.DOM */

var React = require("react");

var ActionDropDown = React.createClass({
    render: function() {
        return (
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id={'dropdownMenu-' + this.props.key} data-toggle="dropdown">
                Action <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu" aria-labelledby={'dropdownMenu-' + this.props.key}>
                {this.props.handleEdit && <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.props.handleEdit}>Edit</a></li>}
                <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.props.handleDelete}>Delete</a></li>
              </ul>
            </div>
        );
    }
});

module.exports = ActionDropDown;
