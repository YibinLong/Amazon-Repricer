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
    try {
        console.log('Finding user by email:', email);
        return await knex('users').where({ email }).first();
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

const findUserByUsername = async (username) => {
    try {
        console.log('Finding user by username:', username);
        return await knex('users').where({ username }).first();
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserByUsername
};