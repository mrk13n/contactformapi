// Initializes the `state` service on path `/state`
const { State } = require('./state.class');
const createModel = require('../../models/state.model');
const hooks = require('./state.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/state', new State(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('state');

  service.hooks(hooks);
};
