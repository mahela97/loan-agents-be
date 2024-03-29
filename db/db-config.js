const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        ssl: {
            rejectUnauthorized: false,
        },
    },
    pool: {
        min: 0,
        max: 20,
    },
});

module.exports = knex;
