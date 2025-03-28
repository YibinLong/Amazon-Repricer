const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUser, findUserByEmail, findUserByUsername } = require('../models/user');

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
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await findUserByUsername(username);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        // create a JWT token
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '2h' });

        // send token to frontend
        res.json({ token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser };