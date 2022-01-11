"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFiles = exports.readFiles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fg = require('fast-glob');

var fs = require('fs');

var fsE = require('fs-extra');

var path = require('path'); // 读取文件模版文件中的文件内容


var readFiles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(context) {
    var files, res, _iterator, _step, file, dir;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fg(['**'], {
              cwd: context,
              onlyFiles: true,
              gitignore: true,
              ignore: ['**/node_modules/**', '**/.git/**'],
              dot: true
            });

          case 2:
            files = _context.sent;
            res = {};
            _iterator = _createForOfIteratorHelper(files);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                file = _step.value;
                dir = path.join(context, file);
                res[file] = fs.readFileSync(dir, 'utf-8');
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", res);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readFiles(_x) {
    return _ref.apply(this, arguments);
  };
}(); // 把文件写入相应名字的工程里


exports.readFiles = readFiles;

var writeFiles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dir, files) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Object.keys(files).map(function (name) {
              var context = path.join(dir, name);
              fsE.ensureDirSync(path.dirname(context));
              fs.writeFileSync(context, files[name]);
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function writeFiles(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.writeFiles = writeFiles;