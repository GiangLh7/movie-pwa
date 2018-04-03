const nconf = require('nconf');

// Load all environment settings
nconf.argv().env();

const evnConf = nconf.get('NODE_ENV');
if (evnConf && evnConf !== 'development') {
  nconf.file('override', `src/conf/${nconf.get('NODE_ENV')}.json`)
}

// Base configuration for all environments
nconf.file('default', 'src/conf/development.json');

module.exports = nconf;