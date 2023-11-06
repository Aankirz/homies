"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.getUserListings = exports.deleteUser = exports.updateUser = exports.test = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _error = require("../utils/error.js");

var _listingModel = _interopRequireDefault(require("../models/listing.model.js"));

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

var deleteUser = function deleteUser(req, res, next) {
  return regeneratorRuntime.async(function deleteUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.user.id !== req.params.id)) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, 'You can only delete your own account')));

        case 2:
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndDelete(req.params.id));

        case 5:
          res.clearCookie('access_token');
          res.status(200).json('User has been deleted');
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          next(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

exports.deleteUser = deleteUser;

var getUserListings = function getUserListings(req, res, next) {
  var listings;
  return regeneratorRuntime.async(function getUserListings$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("GET USER LISTINGS");
          console.log(req.user.id);
          console.log(req.params.id);

          if (!(req.user.id === req.params.id)) {
            _context3.next = 18;
            break;
          }

          _context3.prev = 4;
          console.log("HELLO GET USER LISTING");
          _context3.next = 8;
          return regeneratorRuntime.awrap(_listingModel["default"].find({
            userRef: req.params.id
          }));

        case 8:
          listings = _context3.sent;
          console.log(listings);
          res.status(200).json(listings);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          next(_context3.t0, "Error in getUserListing");

        case 16:
          _context3.next = 19;
          break;

        case 18:
          return _context3.abrupt("return", next((0, _error.errorHandler)(401, 'You can only view your own listings!')));

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 13]]);
};

exports.getUserListings = getUserListings;

var getUser = function getUser(req, res, next) {
  var user, _user$_doc, pass, rest;

  return regeneratorRuntime.async(function getUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, 'User not found')));

        case 6:
          _user$_doc = user._doc, pass = _user$_doc.password, rest = _objectWithoutProperties(_user$_doc, ["password"]);
          res.status(200).json(rest);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getUser = getUser;