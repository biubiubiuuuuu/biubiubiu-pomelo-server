var dispatcher = require('../../../util/dispatcher');

var logger = require('pomelo-logger').getLogger('gate', __filename, process.pid);

module.exports = function (app) {
  return new Handler(app);
};

var Handler = function (app) {
  this.app = app;
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next step callback
 *
 */
handler.queryEntry = function (msg, session, next) {
  var uid = msg.uid;
  if (!uid) {
    next(null, {
      code: 422,
      message: 'please provide uid'
    });
    return;
  }
  // get all connectors
  var connectors = this.app.getServersByType('connector');
  if (!connectors || connectors.length === 0) {
    next(null, {
      code: 500,
      message: 'connector service not found'
    });
    return;
  }

  // select connector
  var res = dispatcher.dispatch(uid, connectors);
  next(null, {
    code: 200,
    host: res.host,
    port: res.clientPort
  });
};