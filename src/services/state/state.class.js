const { NotFound } = require('@feathersjs/errors');
const notFound = new NotFound('Country or State Not Found!');
const { Service } = require('feathers-sequelize');

exports.State = class State extends Service {

  async find(params) {
    const geoname = params.geoname;
    const op = params.op;
    const countryCode = params.query.countryCode;
    const stateCode = params.query.stateCode.toUpperCase();
    let countries, stateName;
    let cities = [];

    await geoname.findAll({
      where: {
        [op.or]: [{fcode: 'ADM1'}, {fcode: 'PPL'}, {fcode: 'PPLA'}, {fcode: 'PPLA2'}],
        [op.or]: [{fclass: 'A'}, {fclass: 'P'}],
        country: countryCode,
        admin1: stateCode
      },
      attributes: ['name', 'fcode'],
      order: ['name']
    })
      .then(data => {
        countries = data;
      });

    if (countries.length === 0) return notFound;

    for (let i = 0; i < countries.length; i++) {
      if (countries[i].fcode === 'ADM1') {
        stateName = countries[i].name;
      } else {
        cities.push({name: countries[i].name});
      }
    }

    countries = {
      code: stateCode.toUpperCase(),
      name: stateName,
      cities: cities
    };

    return countries;
  }

};
