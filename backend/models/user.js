const knex = require('../../database/knex')

const createUser = async(user) => {
    return await knex('users').insert(user).returning('*');
};

const findUserByEmail = async (email) => {
    return await knex('users').where({ email }).first();
};

module.exports = {
    createUser,
    findUserByEmail
};