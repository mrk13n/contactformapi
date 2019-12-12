// Initializes the `countries` service on path `/countries`
const { Countries } = require('./countries.class');
const createModel = require('../../models/countries.model');
const state = require('../state/state.service');
const hooks = require('./countries.hooks');

module.exports = function (app) {
  state(app);
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/countries', new Countries(options, app));
  app.use('countries/:countryCode/:stateCode', app.service('state'));

  // Get our initialized service so that we can register hooks
  const service = app.service('countries');

  service.hooks(hooks);
  app.service('countries/:countryCode/:stateCode').hooks(hooks);
};
