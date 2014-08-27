/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Tab = require("./Tab");
var UserLink = require("./UserLink");

var NavBar = React.createClass({
  render: function() {
    return (
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="trades">TrustDavis</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <Tab to="trades">Trades</Tab>
                <Tab to="references">References</Tab>
                <Tab to="contacts">Contacts</Tab>
              </ul>
              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Contact or Trade ID" />
                </div>
                <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li><UserLink id={this.props.user.id} showIcon={true} /></li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
});

module.exports = NavBar;
