
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUser, findUserByEmail } = require('../models/user');

const secret = process.env.JWT_SECRET;

// registration route
async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        // check if user exists
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // create user
        const newUser = await createUser({ username, email, password_hash: passwordHash });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// login route
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        // create a JWT token
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '2h' });

        // save token in session
        req.session.token = token;

        // send token to frontend
        res.json({ token });

        // send token to frontend + tell it to redirect to Amazon OAuth
        // res.json({ token, redirectToAmazon: true });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser };