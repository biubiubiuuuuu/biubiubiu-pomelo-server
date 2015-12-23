var logger = require('pomelo-logger').getLogger('con-log');

module.exports = function (app) {
  return new Handler(app);
};

var Handler = function (app) {
  this.app = app;
};

var handler = Handler.prototype;

/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
handler.enter = function (msg, session, next) {
  var self = this,
    uid = msg.uid;

  var sessionService = self.app.get('sessionService');

  session.bind(uid);

  session.pushAll(function (err) {
    if (err) {
      next(err);
    } else {
      next(null, {
        uid: uid,
        sid: session.id,
        frontendId: session.frontendId
      });
    }
  });
};