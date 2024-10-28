const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUser, findUserByEmail } = require('../models/user');

const router = express.Router();
const secret = process.env.JWT_SECRET;

// registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create user
        const newUser = await createUser({
            username,
            email,
            password_hash: passwordHash
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // find the user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // create a JWT token
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

        // Save token in the session
        req.session.token = token;

        // Redirect to Amazon OAuth
        res.json({ token, redirectToAmazon: true });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;