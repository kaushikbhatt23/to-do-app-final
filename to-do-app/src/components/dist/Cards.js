"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Cards = void 0;
var react_redux_1 = require("react-redux");
var IndividualCard_1 = require("./IndividualCard");
require("./Cards.scss");
exports.Cards = function () {
    var data = react_redux_1.useSelector(function (state) { return state.todos; });
    var filter = react_redux_1.useSelector(function (state) { return state.filter; });
    var sortBy = react_redux_1.useSelector(function (state) { return state.sortBy; });
    var filteredData = data.filter(function (item) {
        if (filter === "all") {
            return true;
        }
        else if (filter === "completed") {
            return item.completed;
        }
        else {
            return !item.completed;
        }
    });
    var sortedData = __spreadArrays(filteredData);
    switch (sortBy) {
        case "name":
            sortedData = sortedData.sort(function (a, b) { return a.title.localeCompare(b.title); });
            break;
        case "priority":
            var low_1 = [];
            var medium_1 = [];
            var high_1 = [];
            sortedData.forEach(function (item) {
                if (item.priority === "low") {
                    low_1.push(item);
                }
                else if (item.priority === "medium") {
                    medium_1.push(item);
                }
                else {
                    high_1.push(item);
                }
            });
            sortedData = __spreadArrays(high_1.concat(medium_1, low_1));
            break;
    }
    return (React.createElement("div", { className: "card-container" }, sortedData.map(function (item) { return (React.createElement(IndividualCard_1["default"], { key: item.id, id: item.id, title: item.title, description: item.description, priority: item.priority, completed: item.completed })); })));
};
