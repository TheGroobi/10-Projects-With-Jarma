import knex from 'knex'

const db = knex({
    client: 'mysql2',
    connection: {
      database: 'recipes',
      user:     'root',
      password: 'polsak123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
    }
});

export default db;