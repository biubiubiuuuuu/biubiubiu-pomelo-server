/**
 * Created by Nemo on 15/3/31.
 */


var SessionService = require('pomelo/lib/common/service/sessionService');
var sessionService = new SessionService();
var connectorHandler = require('../app/servers/connector/handler/entryHandler');

var should = require('should');


var mockApp = {
  serverType: 'connector',
  rpc: {
    chat: {
      chatRemote: {
        add: function (session, uid, frontendId, name, callback) {
          callback(null);
        }
      }
    }
  }
};


describe('connector', function () {

  describe('handler', function () {

    var handler, session, sid = 1, frontendId = 'frontend-server-1';

    before(function () {
      handler = new connectorHandler(mockApp);
      session = sessionService.create(sid, frontendId).toFrontendSession();
    });


    describe('enter', function () {


      it('should return 500 when username is null', function (done) {
        var msg = {username: null, room: 1};

        handler.enter(msg, session, function (err) {
          should.exists(err);
          done();
        });

      });

      it('should return 500 when room is null', function (done) {
        var msg = {username: 'nemo', room: null};
        handler.enter(msg, session, function (err) {
          should.exists(err);
          done();
        });
      });

      it('should return session info and broadcast onNewUser event', function (done) {
        var msg = {username: 'nemo', room: 'javis'};
        handler.enter(msg, session, function (err, result) {
          result.should.deepEqual({
            uid: msg.username + '@' + msg.room,
            sid: sid,
            frontendId: frontendId
          });
          done();
        });
      });

    });
  });
});