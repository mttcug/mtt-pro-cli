"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _commander = _interopRequireDefault(require("commander"));

var _index = _interopRequireDefault(require("./lib/create/index"));

var _index2 = _interopRequireDefault(require("./lib/page/index"));

var _process$argv = (0, _slicedToArray2["default"])(process.argv, 4),
    explain = _process$argv[0],
    cliCommand = _process$argv[1],
    command = _process$argv[2],
    projectName = _process$argv[3];

var commandMap = {
  'create': {
    description: 'create a new project',
    usage: ['prx create <project-name>'],
    action: function action() {
      return (0, _index["default"])(process.argv[3]);
    }
  },
  'page': {
    description: 'create a new page',
    usage: ['prx page add <page-name>'],
    action: function action() {
      return (0, _index2["default"])(process.argv[3], process.argv[4]);
    }
  }
};
Object.keys(commandMap).map(function (command) {
  _commander["default"].command(command).description(commandMap[command].description).usage(commandMap[command].usage[0]).action(function () {
    commandMap[command].action();
  });
}); // function help () {
//     Object.keys(commands).map((command) => {
//         console.log('-'+command, commandMap[command].usage[0], commandMap[command].description)
//     })
// }
// program.on('-h', help)

_commander["default"].parse(process.argv);