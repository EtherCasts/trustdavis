/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

// expost React globally for DevTools
window.React = React;

var TrustDavisApp = require("./components/TrustDavisApp");

var TradeStore = require("./stores/TradeStore");
var TradeActions = require("./actions/TradeActions");
var Trades = require("./components/Trades");
var TradeDetails = require("./components/TradeDetails");

// TODO
var Placeholder = require("./components/Placeholder");

var merge = require('react/lib/merge');

var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var stores = {
  TradeStore: new TradeStore()
};

var actions = merge({}, TradeActions);

var flux = new Fluxxor.Flux(stores, actions);

// TODO mock data
var user = {
    id: "1a73636d",
    name: "Mike"
};

var routes = (
    <Routes>
        <Route handler={TrustDavisApp} user={user}>
            <Redirect from="/" to="trades" />
            <Route name="trades" path="/trades" handler={Trades} flux={flux} />
            <Route name="tradeDetails" path="/trade/:tradeId" handler={TradeDetails} user={user} flux={flux} />
            <Route name="references" path="/references" handler={Placeholder} />
            <Route name="contacts" path="/contacts" handler={Placeholder} />
        </Route>
    </Routes>
);

React.renderComponent(routes, document.getElementById("app"));
