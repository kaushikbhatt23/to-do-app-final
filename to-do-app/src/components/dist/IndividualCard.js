"use strict";
exports.__esModule = true;
// components/Card.tsx
var react_1 = require("react");
require("./IndividualCard.scss");
var react_redux_1 = require("react-redux");
var todoActions_1 = require("../redux/actions/todoActions");
var IndividualCard = function (_a) {
    var id = _a.id, title = _a.title, description = _a.description, priority = _a.priority, completed = _a.completed;
    var dispatch = react_redux_1.useDispatch();
    var onDelete = function () {
        dispatch(todoActions_1.deleteTodo(id));
    };
    var onEdit = function () {
        dispatch(todoActions_1.setCurrentCard(id));
    };
    var onCompleted = function () {
        dispatch(todoActions_1.taskCompleted(id));
    };
    return (react_1["default"].createElement("div", { className: "card" },
        react_1["default"].createElement("h3", null, title),
        react_1["default"].createElement("p", null, description),
        react_1["default"].createElement("div", { className: "priority " + priority.toLowerCase() }, priority),
        react_1["default"].createElement("div", { className: "status " + (completed ? "completed" : "incomplete") }, completed ? "Completed" : "Incomplete"),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("div", { className: "buttons" },
            react_1["default"].createElement("button", { onClick: onDelete }, "Delete"),
            react_1["default"].createElement("button", { onClick: onEdit }, "Edit"),
            react_1["default"].createElement("button", { onClick: onCompleted }, "Completed"))));
};
exports["default"] = IndividualCard;
