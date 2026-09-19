let users = [];
let nextUserId = 1;

const createUser = async (name, email, password, role) => {
    const user = {
        id: nextUserId++,
        name,
        email,
        password,
        role
    };

    users.push(user);

    return user;
};

const findUserByEmail = async (email) => {
    return users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
    );
};

module.exports = {
    createUser,
    findUserByEmail
};