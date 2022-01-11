"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _Page = _interopRequireDefault(require("./Page.js"));

var path = require('path');

var page = function page(projectName, pageName) {
  var pageCreator = new _Page["default"](pageName);
  return pageCreator.create();
};

module.exports = function () {
  return page.apply(void 0, arguments)["catch"](function (err) {
    console.log(_chalk["default"].red(err));
  });
};