"use strict";
exports.__esModule = true;
// store.ts
var toolkit_1 = require("@reduxjs/toolkit");
var todoReducer_1 = require("./reducers/todoReducer");
var middleware_1 = require("./middleware");
var store = toolkit_1.configureStore({
    reducer: {
        todo: todoReducer_1["default"]
    },
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware().concat(middleware_1["default"]); }
});
exports["default"] = store;
