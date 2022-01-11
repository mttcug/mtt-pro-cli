"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _Creator = _interopRequireDefault(require("./Creator"));

var validateProjectName = require('validate-npm-package-name');

var path = require('path');

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(projectName) {
    var _proName, _framework, _platform, _result, _validateProjectName, validForNewPackages, errors, warnings, targetDir, result, _result2, _result3, creator;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _proName = projectName;

            if (_proName) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return _inquirer["default"].prompt([{
              type: 'input',
              name: 'projectName',
              message: 'Please enter the project name: ',
              "default": "project"
            }]);

          case 4:
            _result = _context.sent;
            _proName = _result.projectName;

          case 6:
            _validateProjectName = validateProjectName(_proName), validForNewPackages = _validateProjectName.validForNewPackages, errors = _validateProjectName.errors, warnings = _validateProjectName.warnings;

            if (!validForNewPackages) {
              console.error(_chalk["default"].red('inValid project name!!!'));
              process.exit(-1);
            }

            targetDir = path.resolve(process.cwd(), _proName);

            if (!_fs["default"].existsSync(targetDir)) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return _fs["default"].remove(targetDir);

          case 12:
            console.info(_chalk["default"].magenta('prx start ...'));
            _context.next = 15;
            return _inquirer["default"].prompt([{
              type: 'list',
              name: 'framework',
              message: 'Pick a framework you need to build: ',
              choices: [{
                name: 'Vue',
                value: 'vue'
              }, {
                name: 'React',
                value: 'react'
              }]
            }]);

          case 15:
            result = _context.sent;
            _framework = result.framework;

            if (!(_framework === 'vue')) {
              _context.next = 24;
              break;
            }

            _context.next = 20;
            return _inquirer["default"].prompt([{
              type: 'list',
              name: 'platform',
              message: 'Pick a framework you need to build: ',
              choices: [{
                name: '移动端H5项目',
                value: 'vue_h5'
              }, {
                name: 'PC端业务系统',
                value: 'vue_pc'
              }]
            }]);

          case 20:
            _result2 = _context.sent;
            _platform = _result2.platform;
            _context.next = 28;
            break;

          case 24:
            _context.next = 26;
            return _inquirer["default"].prompt([{
              type: 'list',
              name: 'platform',
              message: 'Pick a framework you need to build: ',
              choices: [{
                name: '移动端H5项目',
                value: 'react_h5'
              }, {
                name: 'PC端业务系统',
                value: 'react_pc'
              }]
            }]);

          case 26:
            _result3 = _context.sent;
            _platform = _result3.platform;

          case 28:
            creator = new _Creator["default"](_proName, _framework, _platform);
            _context.next = 31;
            return creator.create();

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

;

module.exports = function () {
  return create.apply(void 0, arguments)["catch"](function (err) {
    console.log(_chalk["default"].red('project initialing fail!!!'));
    process.exit(-1);
  });
};