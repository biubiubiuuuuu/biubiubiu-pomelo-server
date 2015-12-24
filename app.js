var pomelo = require('pomelo');
var globalChannel = require('pomelo-globalchannel-plugin');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'biubiubiu-pomelo-server');

//app.use(globalChannel, {
//  globalChannel: {
//    host: '127.0.0.1',
//    port: 6379,
//    db: '0'       // optinal, from 0 to 15 with default redis configure
//  }
//});

// app configuration
app.configure('production|development', 'gate', function () {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector
  });
});

app.configure('production|development', 'connector', function () {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector,
    //heartbeat: 3,
    //useDict: false,
    //useProtobuf: false
  });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
