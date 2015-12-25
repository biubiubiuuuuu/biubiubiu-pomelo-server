var logger = require('pomelo-logger').getLogger('con-log');
var assert = require('assert');

module.exports = function (app) {
  return new Handler(app);
};

var Handler = function (app) {
  this.app = app;
  this.globalChannelService = app.get('globalChannelService');
};

var handler = Handler.prototype;

/**
 * 获取房间内的用户数量
 * @param msg
 * @param session
 * @param callback
 * @return {*}
 */
handler.getMembers = function (msg, session, callback) {
  this.globalChannelService.getMembersByChannelName('connector', session.get('room'), callback);
};

handler.comment = function (msg, session, callback) {
  this.globalChannelService.pushMessage('connector', 'onComment', msg, session.get('room'), {}, callback);
};