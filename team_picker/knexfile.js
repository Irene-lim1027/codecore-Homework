// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'superteampicker'
    },
    migrations: {
     
      directory: 'db/migrations'
    }
  },
};
