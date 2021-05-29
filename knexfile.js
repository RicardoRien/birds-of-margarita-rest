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
    
  },
}; 
