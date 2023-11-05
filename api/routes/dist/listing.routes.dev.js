"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyUser = require("../utils/verifyUser");

var _listing = require("../controllers/listing.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/create', _verifyUser.verifyToken, _listing.createListing);
var _default = router;
exports["default"] = _default;