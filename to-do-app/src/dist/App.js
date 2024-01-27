"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Form_1 = require("./components/Form");
var Cards_1 = require("./components/Cards");
var Navbar_1 = require("./components/Navbar");
var pubsub_1 = require("./pubsub");
var services_1 = require("./tailgate/services");
var todoActions_1 = require("./redux/actions/todoActions");
var react_redux_1 = require("react-redux");
function App() {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        var initialFetchSubscription = pubsub_1["default"].subscribe('todosFetched', function (topic, todos) {
            dispatch(todoActions_1.updateFromIndexeddb(todos));
        });
        var _a = services_1["default"](), fetchSubscriptionToken = _a.fetchSubscriptionToken, addSubscriptionToken = _a.addSubscriptionToken, deleteSubscriptionToken = _a.deleteSubscriptionToken, editSubscriptionToken = _a.editSubscriptionToken;
        pubsub_1["default"].publish('fetchTodos', {});
        return function () {
            pubsub_1["default"].unsubscribe(initialFetchSubscription);
            pubsub_1["default"].unsubscribe(fetchSubscriptionToken);
            pubsub_1["default"].unsubscribe(addSubscriptionToken);
            pubsub_1["default"].unsubscribe(deleteSubscriptionToken);
            pubsub_1["default"].unsubscribe(editSubscriptionToken);
        };
    }, []);
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(Form_1["default"], null),
        react_1["default"].createElement("div", { className: 'right-container' },
            react_1["default"].createElement(Navbar_1["default"], null),
            react_1["default"].createElement(Cards_1.Cards, null))));
}
exports["default"] = App;
