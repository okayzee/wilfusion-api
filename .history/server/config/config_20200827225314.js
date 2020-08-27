require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PG_USERNAME_DEV,
    "password": process.env.PG_PASSWORD_DEV,
    "database": process.env.PG_DB_DEV,
    "host": process.env.PG_HOST_DEV,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DB,
    "host": process.env.PG_HOST,
    "dialect": "postgres"
  }
}
