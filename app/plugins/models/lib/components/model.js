var Service = require('../service/modelService');

module.exports = function(app, opts) {
  var service = new Service(app, opts);
  app.set('modelService', service, true);
  service.name = '__model__';
  return service;
};