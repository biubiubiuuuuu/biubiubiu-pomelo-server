var pomelo = require('pomelo');
var globalChannel = require('pomelo-globalchannel-plugin');
var models = require('./app/plugins/models');

require('dotenv').load();

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'biubiubiu-pomelo-server');

app.use(globalChannel, {
  globalChannel: {
    host: process.env.redis_host || '127.0.0.1',
    port: process.env.redis_port || 6379,
    db: '0',
    cleanOnStartUp: true
  }
});

app.use(models, {
  model: {
    host: process.env.mongo_host || '127.0.0.1',
    port: process.env.mongo_port || 27017,
    database:'biubiubiu'
  }
});

// app configuration
app.configure('production|development', 'gate', function () {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector
  });
});

app.configure('production|development', 'connector', function () {
  app.set('connectorConfig', {
    connector: pomelo.connectors.hybridconnector,
    heartbeat: 3,
    useDict: true,
    //useProtobuf: true
  });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
