const debug = require('debug');
const conf = require('./conf/settings');
const Hapi = require('hapi');
const pug = require('pug');
const routes = require('./routes');

// create new server
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});
const init = async () => {
    await server.register(require('inert'));
    await server.register(require('vision'));

    server.route(routes);
    server.views({
        engines: {
            html: require('handlebars')
        }
    });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
//
// //register plugins
// server.register(require('inert'), (err) => {
//   if (err) {
//     debug('Failed to load inert');
//   }
//   server.route(routes);
// });
//
// server.register(require('vision'), (err) => {
//   if (err) {
//     debug('Failed to load vision');
//   }
//   server.views({
//     engines: { pug },
//     path: __dirname,
//     compileOptions: { pretty: true },
//     isCached: conf.get('NODE_ENV') !== 'development'
//   })
// });
//
// server.register(require('./plugins/i18n'), (err) => {
//   if (err) {
//     debug('Failed to initialize i18n');
//   }
//
//   server.start(() => {
//     debug('Server running at:', server.info.uri);
//   });
// });