const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const alternatename = sequelizeClient.define('alternatename', {
    alternatenameid:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'alternatenameid'
    },
    geonameid: {
      type: DataTypes.INTEGER,
      field: 'geonameid'
    },
    isoLanguage: {
      type: DataTypes.STRING(7),
      field: 'isoLanguage'
    },
    alternateName: {
      type: DataTypes.STRING(200),
      field: 'alternateName'
    }
  }, {
    tableName: 'alternatename',
    timestamps: false
  });

  // eslint-disable-next-line no-unused-vars
  alternatename.associate = function (models) {
    // Define associations here
    alternatename.belongsTo(models.geoname, {foreignKey: 'geonameid'});
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return alternatename;
};
