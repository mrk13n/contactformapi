const countries = require('./countries/countries.service.js');
const state = require('./state/state.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(countries);
  app.configure(state);
};
