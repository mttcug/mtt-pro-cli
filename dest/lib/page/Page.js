"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("../../utils/index.js");

var _fsExtra = require("fs-extra");

var path = require('path');

var Page = /*#__PURE__*/function () {
  function Page(projectName, pageName) {
    (0, _classCallCheck2["default"])(this, Page);
    this.projectName = projectName;
    this.pageName = pageName;
  }

  (0, _createClass2["default"])(Page, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var files;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _index.readFiles)(path.resolve(__dirname, '../../template/page'));

              case 2:
                files = _context.sent;
                console.log('----------files:', files);
                (0, _index.writeFiles)(path.resolve(__dirname, '../../test'), files);
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  return 'lll';
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return Page;
}();

var _default = Page;
exports["default"] = _default;