import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/amazon/products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);
};

export default Dashboard;