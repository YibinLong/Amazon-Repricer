const express = require('express');
const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const router = express.Router();

const clientId = process.env.LWA_CLIENT_ID;
const clientSecret = process.env.LWA_CLIENT_SECRET;
const redirectUri = process.env.LWA_REDIRECT_URI;

function generateRandomState() {
    return Math.random().toString(36).substring(2);
}

// Step 1: Redirect to Amazon's OAuth 2.0 server
router.get('/login', (req, res) => {
    const state = generateRandomState();
    req.session.oauthState = state;
    const authUrl = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=${clientId}&state=${state}&version=beta`;
    res.redirect(authUrl);
});

/*
router.get('/login', (req, res) => {
    const state = generateRandomState();
    req.session.oauthState = state;
    const authUrl = `https://www.amazon.com/ap/oa?client_id=${clientId}&scope=sellingpartnerapi::notifications&response_type=code&redirect_uri=${redirectUri}&state=${state}`;
    res.redirect(authUrl);
});
*/

// Step 2: Handle the callback from Amazon
router.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    // Validate the state parameter
    if (state !== req.session.oauthState) {
        return res.status(400).send('Invalid state parameter');
    }

    try {
        const response = await axios.post('https://api.amazon.com/auth/o2/token', qs.stringify({
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const { access_token, refresh_token } = response.data;

        // Save tokens to the user's session or database
        req.session.accessToken = access_token;
        req.session.refreshToken = refresh_token;

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error exchanging authorization code for tokens:', error);
        res.status(500).send('Authentication failed');
    }
});

module.exports = router;
