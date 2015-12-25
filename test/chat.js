/**
 * Created by Nemo on 15/12/25.
 */

var chatRemote = require('../app/servers/chat/remote/chatRemote');

var should = require('should');

describe('chat', function () {

  describe('remote', function () {

    var uid = 'nemo@javis', sid = 'frontend-server-1', name = 'javis';
    var isAdd, isPushMessage;

    describe('add', function () {

      it('should invoke add & pushMessage', function (done) {
        var remote = new chatRemote({
          get: function () {
            return {
              add: function (uid, sid, name, callback) {
                isAdd = true;
                callback(null);
              },
              pushMessage: function (serverType, route, msg, name, callback) {
                isPushMessage = true;
                callback(null);
              }
            }
          }
        });
        remote.add(uid, sid, name, function (err) {
          isAdd.should.equal(true);
          isPushMessage.should.equal(true);
          should.not.exists(err);
          done();
        });

      });

    });
  });

});