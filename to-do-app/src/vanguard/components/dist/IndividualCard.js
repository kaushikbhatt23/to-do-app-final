"use strict";
exports.__esModule = true;
// components/Card.tsx
var react_1 = require("react");
require("./IndividualCard.scss");
var react_redux_1 = require("react-redux");
var todoActions_1 = require("../redux/actions/todoActions");
var IndividualCard = function (_a) {
    var todo = _a.todo;
    var dispatch = react_redux_1.useDispatch();
    var onDelete = function () {
        dispatch(todoActions_1.deleteTodo(todo));
    };
    var onCompleted = function () {
        dispatch(todoActions_1.taskCompleted(todo.id));
    };
    var _b = react_1.useState(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var openModal = function () {
        setIsModalOpen(true);
    };
    react_1.useEffect(function () {
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setEditPriority(todo.priority);
    }, [isModalOpen]);
    var closeModal = function () {
        setIsModalOpen(false);
    };
    var _c = react_1.useState(todo.title), editTitle = _c[0], setEditTitle = _c[1];
    var _d = react_1.useState(todo.description), editDescription = _d[0], setEditDescription = _d[1];
    var _e = react_1.useState(todo.priority), editPriority = _e[0], setEditPriority = _e[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        dispatch(todoActions_1.editTodo(todo.id, editTitle, editDescription, editPriority));
        closeModal();
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "card " + (todo.completed ? "completed" : "") },
            react_1["default"].createElement("input", { type: "checkbox", checked: todo.completed, onChange: onCompleted }),
            react_1["default"].createElement("div", { className: "task-details" },
                react_1["default"].createElement("h3", null, todo.title),
                react_1["default"].createElement("p", null, todo.description),
                react_1["default"].createElement("span", { className: "priority " + todo.priority }, todo.priority)),
            react_1["default"].createElement("div", { className: "actions" },
                react_1["default"].createElement("span", { onClick: onDelete }, "\uD83D\uDDD1"),
                react_1["default"].createElement("span", { onClick: openModal }, "\u270E"))),
        isModalOpen && (react_1["default"].createElement("div", { className: "modal-overlay" },
            react_1["default"].createElement("div", { className: "modal" },
                react_1["default"].createElement("form", { onSubmit: handleSubmit },
                    react_1["default"].createElement("h2", null, "Edit Task"),
                    react_1["default"].createElement("label", { htmlFor: "title" }, "Title:"),
                    react_1["default"].createElement("input", { type: "text", id: "title", name: "title", value: editTitle, onChange: function (e) { return setEditTitle(e.target.value); }, required: true }),
                    react_1["default"].createElement("label", { htmlFor: "description" }, "Description:"),
                    react_1["default"].createElement("textarea", { id: "description", name: "description", value: editDescription, onChange: function (e) { return setEditDescription(e.target.value); } }),
                    react_1["default"].createElement("label", { htmlFor: "priority" }, "Priority:"),
                    react_1["default"].createElement("select", { id: "priority", name: "priority", value: editPriority, onChange: function (e) { return setEditPriority(e.target.value); } },
                        react_1["default"].createElement("option", { value: "low" }, "Low"),
                        react_1["default"].createElement("option", { value: "medium" }, "Medium"),
                        react_1["default"].createElement("option", { value: "high" }, "High")),
                    react_1["default"].createElement("button", null, "Add Task"),
                    react_1["default"].createElement("button", { onClick: closeModal }, "Cancel")))))));
};
exports["default"] = IndividualCard;
