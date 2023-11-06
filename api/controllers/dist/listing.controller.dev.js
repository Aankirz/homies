"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListing = exports.updateListing = exports.deleteListing = exports.createListing = void 0;

var _listingModel = _interopRequireDefault(require("../models/listing.model.js"));

var _error = require("../utils/error.js");

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
          console.log(listing);
          res.status(201).json(listing);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0, "CREATE LISTING");
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.createListing = createListing;

var deleteListing = function deleteListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function deleteListing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 2:
          listing = _context2.sent;

          if (listing) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found')));

        case 5:
          if (!(req.user.id !== listing.userRef)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, 'You can only delete your own listings')));

        case 7:
          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(_listingModel["default"].findByIdAndDelete(req.params.id));

        case 10:
          res.status(200).json('Listing has been deleted');
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](7);
          next(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 13]]);
};

exports.deleteListing = deleteListing;

var updateListing = function updateListing(req, res, next) {
  var listing, updatedListing;
  return regeneratorRuntime.async(function updateListing$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 2:
          listing = _context3.sent;

          if (listing) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found!')));

        case 5:
          if (!(req.user.id !== listing.userRef)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next((0, _error.errorHandler)(401, 'You can only update your own listings!')));

        case 7:
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(_listingModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 10:
          updatedListing = _context3.sent;
          res.status(200).json(updatedListing);
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          next(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.updateListing = updateListing;

var getListing = function getListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function getListing$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 3:
          listing = _context4.sent;

          if (listing) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found!')));

        case 6:
          res.status(200).json(listing);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getListing = getListing;