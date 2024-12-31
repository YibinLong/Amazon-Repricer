import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingRulesForm from '../components/PricingRulesForm';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/amazon/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <h2>Your Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <PricingRulesForm productId={product.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;