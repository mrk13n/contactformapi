// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const geoname = sequelizeClient.define('geoname', {
    geonameid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'geonameid'
    },
    name: {
      type: DataTypes.STRING(200),
      field: 'name'
    },
    fclass: {
      type: DataTypes.CHAR(1),
      field: 'fclass'
    },
    fcode: {
      type: DataTypes.STRING(10),
      field: 'fcode'
    },
    country: {
      type: DataTypes.STRING(2),
      field: 'country'
    },
    admin1: {
      type: DataTypes.STRING(20),
      field: 'admin1'
    }
  }, {
    tableName: 'geoname',
    timestamps: false
  });

  // eslint-disable-next-line no-unused-vars
  geoname.associate = function (models) {
    // Define associations here
    geoname.hasMany(models.alternatename, {foreignKey: 'geonameid'});
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return geoname;
};
