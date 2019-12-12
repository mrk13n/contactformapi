const { NotFound } = require('@feathersjs/errors');
const notFound = new NotFound('Country Not Found!');
const { Service } = require('feathers-sequelize');

exports.Countries = class Countries extends Service {

  async find(params) {
    const geoname = params.geoname;
    let countries;

    await geoname.findAll({
      where: {
        fcode: 'PCLI',
        fclass: 'A'
      },
      attributes: [['country', 'code'], 'name'],
      order: ['country']
    })
      .then(data => {
        countries = data;
      });

    return countries;
  }

  async get(countryCode, params) {
    const geoname = params.geoname;
    const op = params.op;
    let countries, countryName;
    let states = [];

    await geoname.findAll({
      where: {
        [op.or]: [{fcode: 'ADM1'}, {fcode: 'PCLI'}],
        fclass: 'A',
        country: countryCode
      },
      attributes: ['admin1', 'name', 'fcode'],
      order: ['admin1']
    })
      .then(data => {
        countries = data;
      });

    if (countries.length === 0) return notFound;

    for (let i = 0; i < countries.length; i++) {
      if (countries[i].fcode === 'PCLI') {
        countryName = countries[i].name;
      } else {
        let oneState = {
          code: countries[i].admin1,
          name: countries[i].name
        };
        states.push(oneState);
      }
    }

    countries = {
      code: countryCode.toUpperCase(),
      name: countryName,
      states: states
    };

    return countries;
  }

};
