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
var References = require("./components/References");
var Contacts = require("./components/Contacts");

var merge = require('react/lib/merge');

// TODO
var Placeholder = require("./components/Placeholder");

// TODO mock data
var fixtures = require("./fixtures");

// Load jQuery and bootstrap
var jQuery = require("jquery");
window.jQuery = jQuery;
require("bootstrap/dist/js/bootstrap.js");
require("./css/style.css");

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
        <Route handler={TrustDavisApp} user={fixtures.user}>
            <Redirect from="/" to="trades" />
            <Route name="trades" path="/trades" handler={Trades} flux={flux} />
            <Route name="tradeDetails" path="/trade/:tradeId" handler={TradeDetails} user={fixtures.user} flux={flux} />
            <Route name="references" path="/references" handler={References} flux={flux} />
            <Route name="contacts" path="/contacts" handler={Contacts} flux={flux} />
        </Route>
    </Routes>
);

React.renderComponent(routes, document.getElementById("app"));
