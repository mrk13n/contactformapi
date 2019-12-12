

module.exports = {
  before: {
    all(context) {
      const sequelize = context.app.get('sequelizeClient');
      context.params.op = sequelize.Sequelize.Op;
      context.params.geoname = sequelize.model('geoname');
      context.params.alternatename = sequelize.model('alternatename');
      context.params.query.countryCode = context.params.route.countryCode;
      context.params.query.stateCode = context.params.route.stateCode;
      return context;
    },
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
