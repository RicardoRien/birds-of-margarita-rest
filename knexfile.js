// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/margarita_birds.db3'
    },  
    pool: {
      afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migration: {
      tablename: 'knex_migration',
      directory: './migrations',
    },
  },
}; 
