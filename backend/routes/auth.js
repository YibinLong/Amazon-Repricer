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
