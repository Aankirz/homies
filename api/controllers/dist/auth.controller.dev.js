"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = exports.google = exports.signin = exports.signup = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _error = require("../utils/error.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var signup = function signup(req, res, next) {
  var _req$body, username, email, password, hashedPassword, newUser;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          hashedPassword = _bcryptjs["default"].hashSync(password, 10);
          newUser = new _userModel["default"]({
            username: username,
            email: email,
            password: hashedPassword
          });
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(newUser.save());

        case 6:
          // save it in the database 
          res.status(201).json("User created successfully: ".concat(newUser));
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          next((0, _error.errorHandler)(550, "HELLO ERRORS HERE: ".concat(_context.t0.message)));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

exports.signup = signup;

var signin = function signin(req, res, next) {
  var _req$body2, email, password, validUser, validPassword, token, _validUser$_doc, pass, rest;

  return regeneratorRuntime.async(function signin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          validUser = _context2.sent;

          if (validUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(404, 'User not found')));

        case 7:
          validPassword = _bcryptjs["default"].compareSync(password, validUser.password);

          if (validPassword) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, 'Invalid password')));

        case 10:
          token = _jsonwebtoken["default"].sign({
            id: validUser._id
          }, process.env.JSONWEBTOKEN);
          _validUser$_doc = validUser._doc, pass = _validUser$_doc.password, rest = _objectWithoutProperties(_validUser$_doc, ["password"]);
          res.cookie('access_token', token, {
            httpOnly: true
          }).status(200).json(rest);
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          next((0, _error.errorHandler)(550, "Hello ERRORS HERE: ".concat(_context2.t0.message)));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.signin = signin;

var google = function google(req, res, next) {
  var user, token, _user$_doc, pass, rest, generatePassword, hashedPassword, newUser, _token, _newUser$_doc, _pass, _rest;

  return regeneratorRuntime.async(function google$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: req.body.email
          }));

        case 3:
          user = _context3.sent;

          if (!user) {
            _context3.next = 11;
            break;
          }

          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JSONWEBTOKEN);
          _user$_doc = user._doc, pass = _user$_doc.password, rest = _objectWithoutProperties(_user$_doc, ["password"]);
          console.log(user._doc, "HELLO 3");
          res.cookie('access_token', token, {
            httpOnly: true
          }).status(200).json(rest);
          _context3.next = 20;
          break;

        case 11:
          generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          hashedPassword = _bcryptjs["default"].hashSync(generatePassword, 10);
          newUser = new _userModel["default"]({
            username: req.body.name.split(' ').join('').toLowerCase(),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.photo
          });
          _context3.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          console.log(newUser, "HELLO 4");
          _token = _jsonwebtoken["default"].sign({
            id: newUser._id
          }, process.env.JSONWEBTOKEN);
          _newUser$_doc = newUser._doc, _pass = _newUser$_doc.password, _rest = _objectWithoutProperties(_newUser$_doc, ["password"]);
          res.cookie('access_token', _token, {
            httpOnly: true
          }).status(200).json(_rest); // console.log(rest,"HELLO 5")   

        case 20:
          _context3.next = 25;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          // console.log("NO HELLO")
          next(_context3.t0);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.google = google;

var signOut = function signOut(req, res, next) {
  return regeneratorRuntime.async(function signOut$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            res.clearCookie('access_token').status(200).json({
              message: "Sign out successfully"
            });
          } catch (err) {
            next(err);
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.signOut = signOut;