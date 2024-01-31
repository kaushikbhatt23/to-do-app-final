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
var TodoService = /** @class */ (function () {
    function TodoService() {
        this.dbName = "TodoDB";
        this.storeName = "Todos";
        this.db = null;
        this.initDatabase();
    }
    TodoService.getInstance = function () {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService();
        }
        return TodoService.instance;
    };
    TodoService.prototype.initDatabase = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = indexedDB.open(_this.dbName, 3);
                        request.onupgradeneeded = function (event) {
                            var db = event.target.result;
                            if (!db.objectStoreNames.contains(_this.storeName)) {
                                db.createObjectStore(_this.storeName, { keyPath: "id" });
                            }
                        };
                        request.onsuccess = function (event) {
                            _this.db = event.target.result;
                            resolve();
                        };
                        request.onerror = function () {
                            console.error("Error opening IndexedDB");
                            reject(new Error("Error opening IndexedDB"));
                        };
                    })];
            });
        });
    };
    TodoService.prototype.getAllTodos = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForDBInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (!_this.db) {
                                    reject(new Error("IndexedDB not initialized."));
                                }
                                var transaction = _this.db.transaction([_this.storeName], "readonly");
                                var store = transaction.objectStore(_this.storeName);
                                var getAllRequest = store.getAll();
                                getAllRequest.onsuccess = function (event) {
                                    var todos = event.target.result;
                                    resolve(todos);
                                };
                                getAllRequest.onerror = function () {
                                    reject(new Error("Error fetching todos from IndexedDB"));
                                };
                            })];
                }
            });
        });
    };
    TodoService.prototype.addTodo = function (todo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.db) {
                reject(new Error("IndexedDB not initialized."));
                return;
            }
            var transaction = _this.db.transaction([_this.storeName], "readwrite");
            var store = transaction.objectStore(_this.storeName);
            var addRequest = store.add(todo);
            addRequest.onsuccess = function () {
                console.log("Todo added successfully in IndexedDB.");
                resolve();
            };
            addRequest.onerror = function (event) {
                var error = event.target.error;
                console.error("Error adding todo:", error);
                reject(error);
            };
        });
    };
    TodoService.prototype.deleteTodo = function (todoId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.db) {
                reject(new Error("IndexedDB not initialized."));
                return;
            }
            var transaction = _this.db.transaction([_this.storeName], "readwrite");
            var store = transaction.objectStore(_this.storeName);
            var deleteRequest = store["delete"](todoId);
            deleteRequest.onsuccess = function () {
                console.log("Todo deleted successfully from IndexedDB.");
                resolve();
            };
            deleteRequest.onerror = function (event) {
                var error = event.target.error;
                console.error("Error deleting todo:", error);
                reject(error);
            };
        });
    };
    TodoService.prototype.editTodo = function (updatedTodo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.db) {
                reject(new Error("IndexedDB not initialized."));
                return;
            }
            var transaction = _this.db.transaction([_this.storeName], "readwrite");
            var store = transaction.objectStore(_this.storeName);
            var editRequest = store.put(updatedTodo);
            editRequest.onsuccess = function () {
                console.log("Todo edited successfully in IndexedDB.");
                resolve();
            };
            editRequest.onerror = function (event) {
                var error = event.target.error;
                console.error("Error editing todo:", error);
                reject(error);
            };
        });
    };
    TodoService.prototype.waitForDBInitialization = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var checkDBInitialization = function () {
                            if (_this.db) {
                                resolve();
                            }
                            else {
                                setTimeout(checkDBInitialization, 10);
                            }
                        };
                        checkDBInitialization();
                    })];
            });
        });
    };
    TodoService.prototype.storeDataInIndexedDB = function (data) {
        if (this.db) {
            var transaction = this.db.transaction([this.storeName], "readwrite");
            var store_1 = transaction.objectStore(this.storeName);
            data.forEach(function (todo) {
                store_1.put(todo);
            });
        }
    };
    return TodoService;
}());
exports["default"] = TodoService;
