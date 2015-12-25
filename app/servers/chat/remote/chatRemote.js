/**
 * Created by Nemo on 15/12/24.
 */
var logger = require('pomelo-logger').getLogger('chat', __filename);

module.exports = function (app) {
  return new ChatRemote(app);
};

var ChatRemote = function (app) {
  this.app = app;
  this.globalChannelService = app.get('globalChannelService');
};

/**
 * 添加用户至聊天室
 * @param uid 用户唯一id
 * @param sid front server Id
 * @param name  房间名
 * @param callback
 */
ChatRemote.prototype.add = function (uid, sid, name, callback) {

  var globalChannelService = this.globalChannelService;
  globalChannelService.add(name, uid, sid, function (err) {
    if (err) {
      return callback(err);
    }
    logger.debug('%s:%s enter room ', uid, sid);
    globalChannelService.pushMessage('connector', 'onUserEnter', {uid: uid}, name, {}, callback);
  });
};

ChatRemote.prototype.leave = function (uid, sid, name, callback) {
  logger.debug('%s:%s leave room ', uid, sid);
  var globalChannelService = this.globalChannelService;
  globalChannelService.leave(name, uid, sid, function (err) {
    if (err)return callback(err);
    globalChannelService.pushMessage('connector', 'onUserLeave', {uid: uid}, name, {}, callback);
  });
};