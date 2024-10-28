const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const endpoint = 'https://sellingpartnerapi-na.amazon.com/';
const marketplaceId = 'A2EUQ1WTGCTBG2'

const getAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post('https://api.amazon.com/auth/o2/token', qs.stringify({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: process.env.LWA_CLIENT_ID,
            client_secret: process.env.LWA_CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }    
};

const fetchOrders = async (req) => {
    try {
        const refreshToken = req.session.refreshToken;
        const accessToken = await getAccessToken(refreshToken);

        const requestParams = {
            MarketplaceIds: marketplaceId,
            CreatedAfter: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        };

        const response = await axios.get(
            `${endpoint}orders/v0/orders?${qs.stringify(requestParams)}`, {
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

const fetchProducts = async (req) => {
    try {
        const refreshToken = req.session.refreshToken;
        const accessToken = await getAccessToken(refreshToken);

        const requestParams = {
            MarketplaceIds: marketplaceId,
        };

        const response = await axios.get(
            `${endpoint}catalog/v0/items?${qs.stringify(requestParams)}`, {
                headers: {
                    'x-amz-access-token': accessToken,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

module.exports = {
    fetchOrders,
    fetchProducts,
    getAccessToken
};
