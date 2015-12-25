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

handler.enter = function (msg, session, callback) {
  var self = this;
  try {
    assert(msg.username, 'username cannot be blank');
    assert(msg.room, 'username cannot be blank');
  } catch (e) {
    return callback(e);
  }

  var uid = msg.username + '@' + msg.room;

  session.bind(uid);
  session.set('room', msg.room);
  session.pushAll(function (err) {
    if (err)return callback(err);
    self.app.rpc.chat.chatRemote.add(session, uid, session.frontendId, msg.room, function (err) {
      if (err)return callback(err);
      callback(null, {
        uid: uid,
        sid: session.id,
        frontendId: session.frontendId
      });
    });
  });

  session.on('closed', function () {
    self.app.rpc.chat.chatRemote.leave(session, uid, session.frontendId, msg.room, function (err) {
      if (err) {
        logger.error(err)
      }
    });
  })
};