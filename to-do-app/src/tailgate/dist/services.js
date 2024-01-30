"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.initializeTodosFromIndexedDB = void 0;
var pubsub_1 = require("../pubsub");
var indexedDb_1 = require("./db/indexedDb");
var api_1 = require("./api");
var todoService = indexedDb_1["default"].getInstance();
var apiUrl = "http://localhost:3000/todos";
exports.initializeTodosFromIndexedDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var todos, todosFromServer, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, todoService.getAllTodos()];
            case 1:
                todos = _a.sent();
                if (!!todos) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, api_1.fetchTodosFromServer()];
            case 3:
                todosFromServer = _a.sent();
                // Store the fetched data in IndexedDB
                todoService.storeDataInIndexedDB(todosFromServer);
                // Publish the fetched data
                pubsub_1["default"].publish("todosFetched", todosFromServer);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error fetching todos from the JSON server:", error_1.message);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                // Data found in IndexedDB, publish the existing data
                pubsub_1["default"].publish("todosFetched", todos);
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.error("Error fetching todos from IndexedDB:", error_2.message);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var subscribeToTodoEvents = function () {
    var fetchSubscriptionToken = pubsub_1["default"].subscribe("fetchTodos", function (topic, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.initializeTodosFromIndexedDB();
            return [2 /*return*/];
        });
    }); });
    // Subscribe to the 'newTodoAdded' event
    var addSubscriptionToken = pubsub_1["default"].subscribe("addTodo", function (topic, data) { return __awaiter(void 0, void 0, void 0, function () {
        var firstTrySuccessful, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firstTrySuccessful = false;
                    try {
                        todoService.addTodo(data.todo); // add to indexeddb
                        firstTrySuccessful = true;
                    }
                    catch (error) {
                        pubsub_1["default"].publish("addingTodoFailed", data.todo.id);
                        console.log(error);
                    }
                    if (!firstTrySuccessful) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.addTodo(data.todo)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        todoService.deleteTodo(data.todo.id);
                        pubsub_1["default"].publish("addingTodoFailed", data.todo.id);
                    }
                    else {
                        console.log("Todo added at server successfully");
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    // Subscribe to the 'todoDeleted' event
    var deleteSubscriptionToken = pubsub_1["default"].subscribe("deleteTodo", function (topic, data) { return __awaiter(void 0, void 0, void 0, function () {
        var firstTrySuccessful, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firstTrySuccessful = false;
                    try {
                        todoService.deleteTodo(data.todo.id);
                        firstTrySuccessful = true;
                    }
                    catch (error) {
                        console.log(error.message);
                        pubsub_1["default"].publish("deletingTodoFailed", data.todo);
                    }
                    if (!firstTrySuccessful) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.deleteTodo(data.todo.id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        todoService.addTodo(data.todo);
                        pubsub_1["default"].publish("deletingTodoFailed", data.todo);
                    }
                    else {
                        console.log("Todo deleted at server successfully");
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    // Subscribe to the 'todoEdited' event
    var editSubscriptionToken = pubsub_1["default"].subscribe("editTodo", function (topic, data) { return __awaiter(void 0, void 0, void 0, function () {
        var firstTrySuccessful, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    firstTrySuccessful = false;
                    try {
                        todoService.editTodo(data.updatedTodo);
                        firstTrySuccessful = true;
                    }
                    catch (error) {
                        pubsub_1["default"].publish("editingTodoFailed", data.previousTodo);
                        console.log(error.message);
                    }
                    if (!firstTrySuccessful) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.updateTodo(data.updatedTodo.id, data.updatedTodo)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        todoService.editTodo(data.previousTodo);
                        pubsub_1["default"].publish("editingTodoFailed", data.previousTodo);
                    }
                    else {
                        console.log("Todo updated at server successfully");
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    return {
        fetchSubscriptionToken: fetchSubscriptionToken,
        addSubscriptionToken: addSubscriptionToken,
        deleteSubscriptionToken: deleteSubscriptionToken,
        editSubscriptionToken: editSubscriptionToken
    };
};
exports["default"] = subscribeToTodoEvents;
