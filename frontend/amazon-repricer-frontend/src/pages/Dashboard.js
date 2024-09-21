import React, { useState, useEffect } from 'react';
import PricingRulesForm from '../components/PricingRulesForm';

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

    return (
        <div>
            <h2>Your Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <PricingRulesForm productId={product.id} />
                        {/* TODO: add buttons to edit/delete products */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;