"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var todoActions_1 = require("../redux/actions/todoActions");
require("./Navbar.scss");
var Navbar = function () {
    var filter = react_redux_1.useSelector(function (state) { return state.filter; });
    var sortfilter = react_redux_1.useSelector(function (state) { return state.sortBy; });
    var dispatch = react_redux_1.useDispatch();
    var handleFilterChange = function (event) {
        var selectedFilter = event.target.value;
        dispatch(todoActions_1.setFilter(selectedFilter));
    };
    var handleSortChange = function (event) {
        var selectedSort = event.target.value;
        dispatch(todoActions_1.sortBy(selectedSort));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        "Filter :",
        " ",
        react_1["default"].createElement("select", { value: filter, onChange: handleFilterChange },
            react_1["default"].createElement("option", { value: "all" }, "All"),
            react_1["default"].createElement("option", { value: "completed" }, "Completed"),
            react_1["default"].createElement("option", { value: "incomplete" }, "Incomplete")),
        " ",
        "Sort By : ",
        " ",
        react_1["default"].createElement("select", { value: sortfilter, onChange: handleSortChange },
            react_1["default"].createElement("option", { value: "none" }, "None"),
            react_1["default"].createElement("option", { value: "name" }, "Name"),
            react_1["default"].createElement("option", { value: "priority" }, "Priority"))));
};
exports["default"] = Navbar;
