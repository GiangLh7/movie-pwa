/* jshint esnext:true */
const _ = require('lodash');
const i18next = require('i18next');
const i18nService = require('../services/i18n.js');

exports.register = (server, options, next) => {
  // Assign current language to request
  server.ext('onPreHandler', (request, reply) => {
    request.lang = i18nService.detectLanguage(request);
    const embeddedLanguage = i18nService.isLanguageEmbeddedIntoUrl(request.url.path);
    if (!request.state.lang || request.query.lang || embeddedLanguage) {
      reply.state('lang', request.lang, { path: '/' });
    }
    reply.continue();
  });

  // Assign translate function to request
  server.ext('onPreResponse', (request, reply) => {
    const response = request.response;
    if (!response || response.variety !== 'view') {
      return reply.continue();
    }

    response.source.context = _.assignIn(response.source.context || {}, {
      t: (string, replace) => {
        const translation = i18next.t(string, { replace, lng: request.lang });
        return !_.isEmpty(translation) ? translation : string;
      },
    });
    reply.continue();
  });

  initTranslations().then(next, next);
};
exports.register.attributes = { name: 'i18n' };

/**
 * Loads translations into i18next plugin
 * @returns {Promise}
 */
const initTranslations = () => (
  new Promise((resolve, reject) => {
    i18nService.getTranslations('backend').then((translations) => {
      i18next.init({
        nsSeparator: false, keySeparator: false, interpolation: { prefix: '%{', suffix: '}' },
      });
      _.forEach(translations, (value, key) => {
        i18next.addResources(key, 'translation', value);
      });
      resolve();
    }, reject);
  })
);
