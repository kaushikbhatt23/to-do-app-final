"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var todoActions_1 = require("../redux/actions/todoActions");
require("./Navbar.scss");
var todoActions_2 = require("../redux/actions/dist/todoActions");
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
    var _a = react_1.useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var openModal = function () {
        setIsModalOpen(true);
    };
    var closeModal = function () {
        handleClear();
        setIsModalOpen(false);
    };
    var _b = react_1.useState(""), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(""), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState("medium"), priority = _d[0], setPriority = _d[1];
    var _e = react_1.useState(false), completionStatus = _e[0], setCompletionStatus = _e[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        dispatch(todoActions_2.addTodo(title, description, priority, completionStatus));
        console.log(title);
        closeModal();
        handleClear();
    };
    var handleClear = function () {
        setTitle("");
        setDescription("");
        setPriority("medium");
        setCompletionStatus(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "app" },
            react_1["default"].createElement("nav", { className: "navbar" },
                react_1["default"].createElement("div", { className: "left-button" },
                    react_1["default"].createElement("button", { onClick: openModal }, "Add Task")),
                react_1["default"].createElement("div", { className: "right-buttons" },
                    react_1["default"].createElement("select", { value: filter, onChange: handleFilterChange },
                        react_1["default"].createElement("option", { value: "all" }, "All"),
                        react_1["default"].createElement("option", { value: "completed" }, "Completed"),
                        react_1["default"].createElement("option", { value: "incomplete" }, "Incomplete")),
                    react_1["default"].createElement("select", { value: sortfilter, onChange: handleSortChange },
                        react_1["default"].createElement("option", { value: "none" }, "None"),
                        react_1["default"].createElement("option", { value: "name" }, "Name"),
                        react_1["default"].createElement("option", { value: "priority" }, "Priority"))))),
        isModalOpen && (react_1["default"].createElement("div", { className: "modal-overlay" },
            react_1["default"].createElement("div", { className: "modal" },
                react_1["default"].createElement("form", { onSubmit: handleSubmit },
                    react_1["default"].createElement("h2", null, "Add Task"),
                    react_1["default"].createElement("label", { htmlFor: "title" }, "Title:"),
                    react_1["default"].createElement("input", { type: "text", id: "title", name: "title", value: title, onChange: function (e) { return setTitle(e.target.value); }, required: true }),
                    react_1["default"].createElement("label", { htmlFor: "description" }, "Description:"),
                    react_1["default"].createElement("textarea", { id: "description", name: "description", value: description, onChange: function (e) { return setDescription(e.target.value); } }),
                    react_1["default"].createElement("label", { htmlFor: "priority" }, "Priority:"),
                    react_1["default"].createElement("select", { id: "priority", name: "priority", value: priority, onChange: function (e) { return setPriority(e.target.value); } },
                        react_1["default"].createElement("option", { value: "low" }, "Low"),
                        react_1["default"].createElement("option", { value: "medium" }, "Medium"),
                        react_1["default"].createElement("option", { value: "high" }, "High")),
                    react_1["default"].createElement("button", null, "Add Task"),
                    react_1["default"].createElement("button", { onClick: closeModal }, "Cancel")))))));
};
exports["default"] = Navbar;
