const pool = require("../config/db");

const createUser = async (name, email, password, role) => {
    const result = await pool.query(
        `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, password, role
        `,
        [name, email, password, role]
    );

    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT id, name, email, password, role
        FROM users
        WHERE LOWER(email) = LOWER($1)
        `,
        [email]
    );

    return result.rows[0] || null;
};

module.exports = {
    createUser,
    findUserByEmail
};