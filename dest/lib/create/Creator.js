"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Creator = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var downloadGit = require('download-git-repo');

var fs = require('fs');

var fsE = require('fs-extra');

var path = require('path');

var fg = require('fast-glob');

var ora = require('ora');

var rm = require('rimraf');

var _require = require('child_process'),
    exec = _require.exec;

var chalk = require('chalk');

var Creator = /*#__PURE__*/function () {
  function Creator(projectName, framework, platform) {
    (0, _classCallCheck2["default"])(this, Creator);
    this.projectName = projectName;
    this.framework = framework;
    this.platform = platform;
  }

  (0, _createClass2["default"])(Creator, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this = this;

        var context, files;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.downLoad();

              case 2:
                context = path.join(process.cwd(), 'project');
                _context.next = 5;
                return this.readFiles(context);

              case 5:
                files = _context.sent;
                _context.next = 8;
                return this.writeFiles(path.join(process.cwd(), this.projectName), files);

              case 8:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  rm(context, {}, function (err) {
                    var loading = ora('installing modules...');
                    loading.start();
                    exec('npm install', {
                      cwd: "".concat(_this.projectName)
                    }, function (err) {
                      if (err) return reject(err);
                      resolve();
                      loading.succeed();
                      console.log(_logSymbols["default"].success, chalk.green('prx initial success'));
                      var cmd = _this.framework === 'react' ? 'npm run start' : 'npm run dev';
                      console.log(chalk.cyan("\u2728 cd ".concat(_this.projectName, " && ").concat(cmd)));
                    });
                  });
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }() // 下载模版

  }, {
    key: "downLoad",
    value: function () {
      var _downLoad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var loading;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                loading = ora('downloading template ...');
                loading.start();
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  downloadGit('direct:https://github.com/mttcug/react-base', 'project', {
                    clone: true
                  }, function (err) {
                    console.log(err);

                    if (err) {
                      loading.fail();
                      return reject(err);
                    }

                    loading.succeed();
                    resolve();
                  });
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function downLoad() {
        return _downLoad.apply(this, arguments);
      }

      return downLoad;
    }() // 读取文件模版文件中的文件内容

  }, {
    key: "readFiles",
    value: function () {
      var _readFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(context) {
        var files, res, _iterator, _step, file, dir;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fg(['**'], {
                  cwd: context,
                  onlyFiles: true,
                  gitignore: true,
                  ignore: ['**/node_modules/**', '**/.git/**'],
                  dot: true
                });

              case 2:
                files = _context3.sent;
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

                return _context3.abrupt("return", res);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function readFiles(_x) {
        return _readFiles.apply(this, arguments);
      }

      return readFiles;
    }() // 把文件写入相应名字的工程里

  }, {
    key: "writeFiles",
    value: function () {
      var _writeFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(dir, files) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                Object.keys(files).map(function (name) {
                  var context = path.join(dir, name);
                  fsE.ensureDirSync(path.dirname(context));
                  fs.writeFileSync(context, files[name]);
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function writeFiles(_x2, _x3) {
        return _writeFiles.apply(this, arguments);
      }

      return writeFiles;
    }()
  }]);
  return Creator;
}();

exports.Creator = Creator;
var _default = Creator;
exports["default"] = _default;