/**
 * Created by Nemo on 15/3/31.
 */

var pomelo = require('pomelo-nodejsclient-websocket');
var client = new pomelo();
var util = require('./utils');
var should = require('should');
var _ = require('lodash');

describe('gate', function () {

  describe('handler', function () {

    describe('queryEntry', function () {
      var gate;
      beforeEach(function () {
        gate = util.getRandomServer('gate');
      });
      it('should return 500', function (done) {
        client.init({host: gate.host, port: gate.clientPort, log: false}, function () {
          client.request('gate.gateHandler.queryEntry', {uid: null}, function (err, result) {
            result.code.should.equal(422);
            client.disconnect();
            done();
          })
        });
      });

      it('should return a random connector server', function (done) {
        client.init({host: gate.host, port: gate.clientPort, log: false}, function (err) {
          should.not.exist(err);
          client.request('gate.gateHandler.queryEntry', {uid: 'uid'}, function (err, data) {
            data.code.should.equal(200);
            var connectorServes = util.getServersByType('connector');
            should.exists(_.find(connectorServes, {host: data.host, clientPort: data.port}));
            client.disconnect();
            done();
          })
        });
      });
    });
  });
});