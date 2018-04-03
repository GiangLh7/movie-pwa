const conf = require('./conf/settings');
const i18nService = require('./services/i18n');
const appConfig = conf.get('appConfig');
const environment = conf.get('NODE_ENV');
const Path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: `${__dirname}/public/`,
            index: ['index.html', 'default.html']
        }
    }
  }
];