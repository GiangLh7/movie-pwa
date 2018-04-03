const _ = require('lodash');
const req = require('request');
const conf = require('../conf/settings');
const parser = require('accept-language-parser');

const defaultLang = 'en';
const supportLocales = ['en', 'vn'];
let dictionary = {};

function isLocaleSupported(locale) {
  return !locale ? false : supportLocales.indexOf(locale) > -1;
}

function  isLanguageEmbeddedIntoUrl(url) {
  const urlParts = url.split('/').filter((el) => (el.length !== 0));
  if (!urlParts || !urlParts.length) {
    return false;
  }
  const language = urlParts[0] && urlParts[0].length === 2 ? urlParts[0] : null;
  return isLocaleSupported(language) ? language : null;
}

exports.isLanguageEmbeddedIntoUrl = isLanguageEmbeddedIntoUrl;

exports.detectLanguage = (request) => {
  // 1. Take embedded lang from url
  const embeddedLang = isLanguageEmbeddedIntoUrl(request.url.path);
  if (embeddedLang) {
    return embeddedLang;
  }

  // 2. Take from url query string
  if (isLocaleSupported(request.query.lang)) {
    return request.query.lang;
  }

  // 3. Take from cookie
  if (isLocaleSupported(request.state.lang)) {
    return request.state.lang;
  }

  // 4. Take from browsers language
  const browserLocales = parser.parse(request.raw.req.headers['accept-language'] || '');
  if (browserLocales[0] && isLocaleSupported(browserLocales[0].code)) {
    return browserLocales[0].code;
  }

  return defaultLang;
};

exports.getTranslations = (type) => {
  return new Promise((resolve, reject) => {
    if (!_.isEmpty(dictionary)) {
      return resolve(dictionary[type]);
    }
    fetchTranslations().then((translations) => {
      dictionary = translations;
      resolve(dictionary[type])
    }, reject);
  });
};

function fetchTranslations() {
  return new Promise((resolve, reject) => {
    const uri = `${conf.get('API_PATH')}/locale/translate/ux`;
    req.get(uri, (err, response, data) => {
      if (err || response.statusCode !== 200) {
        return reject(err);
      }
      let translations = { backend: {}, frontend: {} };
      if (data && data.length) {
        data.map((item) => {
          const type = item.frontend === 'Yes' ? 'frontend' : 'backend';
          supportLocales.forEach((locale) => {
            // clear current translation data
            if(!translations[type][locale]) {
              translations[type][locale] = {};
            }
            if (!item[locale]) {
              return;
            }
            translations[type][locale][item.tag] = item[locale];
          });
        });
        resolve(translations);
      }
    });
  });
}