"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./Form.scss");
var react_redux_1 = require("react-redux");
var todoActions_1 = require("../redux/actions/todoActions");
var todoActions_2 = require("../redux/actions/dist/todoActions");
var Form = function () {
    var dispatch = react_redux_1.useDispatch();
    var currentCard = react_redux_1.useSelector(function (state) {
        return state.current_card_id
            ? state.todos.find(function (todo) { return todo.id === state.current_card_id; }) || null
            : null;
    });
    var _a = react_1.useState(""), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(""), description = _b[0], setDescription = _b[1];
    var _c = react_1.useState("medium"), priority = _c[0], setPriority = _c[1];
    var _d = react_1.useState(false), completionStatus = _d[0], setCompletionStatus = _d[1];
    var handleSubmit = function () {
        if (!currentCard)
            dispatch(todoActions_1.addTodo(title, description, priority, completionStatus));
        else
            dispatch(todoActions_2.editTodo(currentCard.id, title, description, priority));
        handleClear();
    };
    var handleClear = function () {
        dispatch(todoActions_2.setCurrentCard(null));
        setTitle("");
        setDescription("");
        setPriority("medium");
        setCompletionStatus(false);
    };
    react_1.useEffect(function () {
        if (currentCard) {
            setTitle(currentCard.title);
            setDescription(currentCard.description);
            setPriority(currentCard.priority);
            setCompletionStatus(currentCard.completed);
        }
    }, [currentCard]);
    return (react_1["default"].createElement("form", { className: "task-form", onSubmit: handleSubmit },
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Title:",
            react_1["default"].createElement("input", { type: "text", value: title, onChange: function (e) { return setTitle(e.target.value); }, required: true })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Description:",
            react_1["default"].createElement("textarea", { value: description, onChange: function (e) { return setDescription(e.target.value); } })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Priority:",
            react_1["default"].createElement("select", { value: priority, onChange: function (e) { return setPriority(e.target.value); } },
                react_1["default"].createElement("option", { value: "high" }, "High"),
                react_1["default"].createElement("option", { value: "medium" }, "Medium"),
                react_1["default"].createElement("option", { value: "low" }, "Low"))),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("button", { type: "submit" }, "Add Task"),
        react_1["default"].createElement("button", { onClick: handleClear }, "Clear")));
};
exports["default"] = Form;
