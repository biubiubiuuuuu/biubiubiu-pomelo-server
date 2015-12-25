var mongoose = require('mongoose');
var logger = require('pomelo-logger').getLogger('model-service', __filename);
var models = require('../models');

var ST_INITED = 0;
var ST_STARTED = 1;
var ST_CLOSED = 2;

var ModelService = function (app, opts) {
  this.app = app;
  this.opts = opts || {};
  this.state = ST_INITED;
};

module.exports = ModelService;

ModelService.prototype.start = function (cb) {
  var self = this;
  mongoose.connect(this.opts.host, this.opts.database, this.opts.port, this.opts.options);
  var db = mongoose.connection;
  db.on('error', function (err) {
    logger.error("[model-plugin][mongo]" + err.stack);
  });
  db.once('open', function () {
    self.state = ST_STARTED;
    logger.info('model-status started');
    self.models = models;
    cb();
  });
};

ModelService.prototype.stop = function (callback) {
  var self = this;
  mongoose.disconnect(function () {
    self.state = ST_CLOSED;
    callback();
  })
};