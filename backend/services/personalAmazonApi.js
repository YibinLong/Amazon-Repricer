const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const endpoint = 'https://sellingpartnerapi-na.amazon.com/';
const marketplaceId = 'A2EUQ1WTGCTBG2';

// Store these in your .env file
const PERSONAL_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const PERSONAL_CLIENT_ID = process.env.LWA_CLIENT_ID;
const PERSONAL_CLIENT_SECRET = process.env.LWA_CLIENT_SECRET;

const getPersonalAccessToken = async () => {
    try {
        const response = await axios.post('https://api.amazon.com/auth/o2/token', qs.stringify({
            grant_type: "refresh_token",
            refresh_token: PERSONAL_REFRESH_TOKEN,
            client_id: PERSONAL_CLIENT_ID,
            client_secret: PERSONAL_CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting personal access token:', error);
        throw error;
    }    
};

const fetchPersonalProducts = async () => {
    try {
        const accessToken = await getPersonalAccessToken();

        const response = await axios.get(
            `${endpoint}listings/2021-08-01/items/A2WXT5TCF2XWKB`, {
                params: {
                    marketplaceIds: marketplaceId,
                },
                headers: {
                    'x-amz-access-token': accessToken,
                },
            }
        );

        // Transform the data to a simpler format
        const products = response.data.items.map(item => ({
            sku: item.sku,
            itemName: item.summaries[0].itemName,
            asin: item.summaries[0].asin,
            productType: item.summaries[0].productType,
            createdDate: item.summaries[0].createdDate
        }));

        return products;
    } catch (error) {
        console.error('Error fetching personal products:', error);
        throw error;
    }
};

module.exports = {
    fetchPersonalProducts,
    getPersonalAccessToken
}; 