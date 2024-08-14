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

const fetchOrders = async () => {
    try {
        const accessToken = await getAccessToken();

        const requestParams = {
            MarketplaceIds: marketplaceId,
            CreatedAfter: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        }

        const response = await axios.get(
            endpoint + 'orders/v0/orders?' + qs.stringify(requestParams), {
                headers: {
                    'x-amz-access-token': accessToken,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

module.exports = {
    fetchOrders, getAccessToken
};
