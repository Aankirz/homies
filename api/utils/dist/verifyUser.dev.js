"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _error = require("./error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.cookies.access_token;
  if (!token) return next((0, _error.errorHandler)(401, 'Unauthorized'));

  _jsonwebtoken["default"].verify(token, process.env.JSONWEBTOKEN, function (err, user) {
    if (err) return next((0, _error.errorHandler)(403, 'Forbidden'));
    req.user = user;
    next();
  });
};

exports.verifyToken = verifyToken;