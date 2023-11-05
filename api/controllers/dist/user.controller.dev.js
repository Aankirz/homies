"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.test = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _error = require("../utils/error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var test = function test(req, res) {
  res.send('Hello World');
};

exports.test = test;

var updateUser = function updateUser(req, res, next) {
  var updatedUser, _updatedUser$_doc, password, rest;

  return regeneratorRuntime.async(function updateUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.user.id !== req.params.id)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next((0, _error.errorHandler)(401, 'You can only update your own account')));

        case 2:
          _context.prev = 2;

          if (req.body.password) {
            req.body.password = _bcryptjs["default"].hashSync(req.body.password, 10);
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndUpdate(req.params.id, {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              avatar: req.body.avatar
            }
          }, {
            "new": true
          }));

        case 6:
          updatedUser = _context.sent;
          _updatedUser$_doc = updatedUser._doc, password = _updatedUser$_doc.password, rest = _objectWithoutProperties(_updatedUser$_doc, ["password"]);
          res.status(200).json(rest);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.updateUser = updateUser;