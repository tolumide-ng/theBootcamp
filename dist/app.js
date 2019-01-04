'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  var error = new Error('Bad Request, Route not found');
  error.status = 400;
  next(error);
});

app.use(function (error, req, res) {
  res.status(error.statusCode || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map