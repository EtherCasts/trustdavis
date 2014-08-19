/** @jsx React.DOM */

var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

var TodoStore = require("./stores/TodoStore");
var TodoActions = require("./actions/TodoActions");
var TodoApp = require("./components/TodoApp");

var Route = Router.Route;
var Routes = Router.Routes;

// window.React = React;
// window.flux = flux;

var stores = {
  TodoStore: new TodoStore()
};

var flux = new Fluxxor.Flux(stores, TodoActions);

var routes = (
    <Routes>
        <Route name="welcome" path="/" handler={TodoApp} flux={flux} title="welcome" />
        <Route name="hi" path="/hi" handler={TodoApp} flux={flux} title="hi" />
        <Route name="hello" path="/hello" handler={TodoApp} flux={flux} title="hello" />
        <Route name="say" path="/say/:title" handler={TodoApp} flux={flux} />
    </Routes>
);

React.renderComponent(routes, document.getElementById("app"));
