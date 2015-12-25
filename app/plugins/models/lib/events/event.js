var modelService = require('../service/modelService');
var logger = require('pomelo-logger').getLogger(__filename);

var Event = function (app) {
  this.app = app;
  this.modelService = app.get('modelService');
};

module.exports = Event;