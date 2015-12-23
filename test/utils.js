/**
 * Created by Nemo on 15/3/31.
 */
var _ = require('lodash');
var services = require('../config/servers.json');

exports.getRandomServer = function (type) {
  var env = process.env.NODE_ENV || 'development';
  var typedServices = services[env][type];
  return typedServices[_.random(0, typedServices.length - 1)];
};

exports.getServersByType = function (type) {
  var env = process.env.NODE_ENV || 'development';
  var typedServices = services[env][type];
  return typedServices;
};

exports.getUid = function () {
  var seed = 'abcdefghijklmnopqrstuvwxyz',
    id = '';
  _.times(6, function () {
    id += seed.substr(_.random(0, 25), 1);
  });
  return id;
};