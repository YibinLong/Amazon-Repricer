const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUser, findUserByEmail } = require('../models/user');

const router = express.Router();
const secret = process.env.JWT_SECRET;
