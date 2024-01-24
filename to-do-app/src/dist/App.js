"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Form_1 = require("./components/Form");
var Cards_1 = require("./components/Cards");
var Navbar_1 = require("./components/Navbar");
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(Form_1["default"], null),
        react_1["default"].createElement("div", { className: 'right-container' },
            react_1["default"].createElement(Navbar_1["default"], null),
            react_1["default"].createElement(Cards_1.Cards, null))));
}
exports["default"] = App;
