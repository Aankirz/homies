"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/user.route.js"));

var _authRoute = _interopRequireDefault(require("./routes/auth.route.js"));

var _listingRoutes = _interopRequireDefault(require("./routes/listing.routes.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO).then(function () {
  return console.log('DB is connected');
})["catch"](function (err) {
  return console.log(err);
});

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.listen(3000, function () {
  console.log("Server on port 3000");
});
app.use('/api/user', _userRoute["default"]);
app.use('/api/auth', _authRoute["default"]);
app.use('/api/listing', _listingRoutes["default"]);
app.use(function (err, req, res, next) {
  var statusCode = err.statusCode || 500;
  var message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});