var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'biubiubiu-pomelo-server');

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
