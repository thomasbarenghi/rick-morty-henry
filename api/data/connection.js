const { Sequelize } = require('sequelize');
const mode = require('../config/config');
const path = require('path');

if (mode === "postgreSQL") {

  const dbConfig = {
    database: 'rickandmorty',
    username: 'postgres',
    password: 'admin',
    host: 'localhost',
    dialect: 'postgres'
  };

  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  });

  (async () => {

    try {

      await sequelize.authenticate();
      console.log('Conexión exitosa');

      const tableNames = await sequelize.getQueryInterface().showAllTables();
      console.log('Tablas disponibles:', tableNames);

    } catch (error) { console.error('Imposible conectar:', error); }

  })();

  module.exports = sequelize;

}

else if (mode === "sqlite") {

  const dbPath = path.join(__dirname, 'sqlite.db');

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      sequelize.query("SELECT name FROM sqlite_master WHERE type='table'", { type: sequelize.QueryTypes.SELECT })
        .then((tables) => {
          console.log('Tables:'); tables.forEach((table) => { console.log(table.name); });
        });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  module.exports = sequelize;

}