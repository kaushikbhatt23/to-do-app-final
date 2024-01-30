"use strict";
exports.__esModule = true;
exports.revertEditTodoOperation = exports.revertDeleteTodoOperation = exports.revertAddTodoOperation = exports.updateFromIndexeddb = exports.sortBy = exports.editTodo = exports.setFilter = exports.taskCompleted = exports.deleteTodo = exports.addTodo = void 0;
// Actions.ts
var actionTypes = require("./todoActionTypes");
exports.addTodo = function (title, description, priority, completionStatus) { return ({
    type: actionTypes.ADD_TODO,
    payload: {
        title: title,
        description: description,
        priority: priority,
        completionStatus: completionStatus
    }
}); };
exports.deleteTodo = function (todo) { return ({
    type: actionTypes.DELETE_TODO,
    payload: {
        todo: todo
    }
}); };
exports.taskCompleted = function (id) { return ({
    type: actionTypes.TASK_COMPLETED,
    payload: {
        id: id
    }
}); };
exports.setFilter = function (filter) { return ({
    type: actionTypes.SET_FILTER,
    payload: { filter: filter }
}); };
exports.editTodo = function (id, title, description, priority) { return ({
    type: actionTypes.EDIT_TODO,
    payload: { id: id, title: title, description: description, priority: priority }
}); };
exports.sortBy = function (sortBy) { return ({
    type: actionTypes.SORT_BY,
    payload: { sortBy: sortBy }
}); };
exports.updateFromIndexeddb = function (todos) { return ({
    type: actionTypes.UPDATE_FROM_INDEXEDDB,
    payload: { todos: todos }
}); };
exports.revertAddTodoOperation = function (id) { return ({
    type: actionTypes.ADDING_TO_DB_FAILED,
    payload: { id: id }
}); };
exports.revertDeleteTodoOperation = function (todo) { return ({
    type: actionTypes.DELETION_FROM_DB_FAILED,
    payload: { todo: todo }
}); };
exports.revertEditTodoOperation = function (todo) { return ({
    type: actionTypes.EDIT_IN_DB_FAILED,
    payload: { todo: todo }
}); };
