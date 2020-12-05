var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./datahack.sqlite"
    },
    useNullAsDefault: true
  });

module.exports = knex;