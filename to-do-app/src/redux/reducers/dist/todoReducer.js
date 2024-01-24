"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// Reducer.ts
var actionTypes = require("../actions/todoActionTypes");
var uuid_1 = require("uuid");
var getInitialState = function () {
    var storedTodos = localStorage.getItem("todos");
    return {
        todos: storedTodos ? JSON.parse(storedTodos) : [],
        filter: "all",
        current_card_id: null,
        sortBy: "none"
    };
};
var initialState = getInitialState();
var updateLocalStorage = function (todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
};
var todoReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.ADD_TODO:
            var newTodo = {
                id: uuid_1.v4(),
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                completed: false
            };
            var updatedAddState = __assign(__assign({}, state), { todos: __spreadArrays(state.todos, [newTodo]) });
            updateLocalStorage(updatedAddState.todos);
            return updatedAddState;
        case actionTypes.DELETE_TODO:
            var updatedDeleteState = __assign(__assign({}, state), { todos: state.todos.filter(function (todo) { return todo.id !== action.payload.id; }) });
            updateLocalStorage(updatedDeleteState.todos);
            return updatedDeleteState;
        case actionTypes.TASK_COMPLETED:
            var updatedCompletedTodos = state.todos.map(function (todo) {
                return todo.id === action.payload.id
                    ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
            });
            var updatedCompleteState = __assign(__assign({}, state), { todos: updatedCompletedTodos });
            updateLocalStorage(updatedCompleteState.todos);
            return updatedCompleteState;
        case actionTypes.SET_FILTER:
            return __assign(__assign({}, state), { filter: action.payload.filter });
        case actionTypes.SORT_BY:
            return __assign(__assign({}, state), { sortBy: action.payload.sortBy });
        case actionTypes.SET_CURRENT_TODO:
            return __assign(__assign({}, state), { current_card_id: action.payload.id });
        case actionTypes.EDIT_TODO:
            var updatedEditState = __assign(__assign({}, state), { todos: state.todos.map(function (todo) {
                    return todo.id === action.payload.id
                        ? __assign(__assign({}, todo), { title: action.payload.title, description: action.payload.description, priority: action.payload.priority }) : todo;
                }) });
            updateLocalStorage(updatedEditState.todos);
            return updatedEditState;
        default:
            return state;
    }
};
exports["default"] = todoReducer;
