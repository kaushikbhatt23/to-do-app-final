"use strict";
exports.__esModule = true;
exports.showToast = void 0;
// File: ToastUtils.tsx
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
exports.showToast = function (message) {
    react_toastify_1.toast.info(message, {
        position: 'top-center',
        autoClose: 2500
    });
};
