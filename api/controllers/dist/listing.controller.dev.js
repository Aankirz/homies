"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createListing = void 0;

var _listingModel = _interopRequireDefault(require("../models/listing.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createListing = function createListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function createListing$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_listingModel["default"].create(req.body));

        case 3:
          listing = _context.sent;
          res.status(201).json(listing);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0, "CREATE LISTING");
          next(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createListing = createListing;