const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then((client) => {
        console.log("PostgreSQL Connected");
        client.release();
    })
    .catch((error) => {
        console.error("PostgreSQL Connection Error:", error.message);
    });

module.exports = pool;