const knex = require('../../database/knex')

const createUser = async (user) => {
    try {
        return await knex('users').insert(user).returning('*');
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const findUserByEmail = async (email) => {
    return await knex('users').where({ email }).first();
};

module.exports = {
    createUser,
    findUserByEmail
};