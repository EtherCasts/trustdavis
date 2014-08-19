/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

var TrustDavisApp = require("./components/TrustDavisApp");

var TradeStore = require("./stores/TradeStore");
var TradeActions = require("./actions/TradeActions");
var Trades = require("./components/Trades");

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

var routes = (
    <Routes>
        <Route handler={TrustDavisApp}>
            <Redirect from="/" to="trades" />
            <Route name="trades" path="/trades" handler={Trades} flux={flux} />
            <Route name="tradeDetails" path="/trade/:tradeId" handler={Placeholder} />
            <Route name="references" path="/references" handler={Placeholder} />
            <Route name="contacts" path="/contacts" handler={Placeholder} />
        </Route>
    </Routes>
);

React.renderComponent(routes, document.getElementById("app"));
