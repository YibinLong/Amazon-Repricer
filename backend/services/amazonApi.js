const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const endpoint = 'https://sellingpartnerapi-na.amazon.com/';
const marketplaceId = 'A2EUQ1WTGCTBG2'

const getAccessToken = async () => {
    try {
        const response = await axios.post('https://api.amazon.com/auth/o2/token', qs.stringify({
            grant_type: "refresh_token",
            refresh_token: process.env.REFRESH_TOKEN,
            client_id: process.env.LWA_CLIENT_ID,
            client_secret: process.env.LWA_CLIENT_SECRET,
        }));

        return response.data.access_token
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }    
};
