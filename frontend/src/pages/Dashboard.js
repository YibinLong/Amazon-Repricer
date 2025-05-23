import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingRulesForm from '../components/PricingRulesForm';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/api/personal/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        fetchProducts();
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <h2>My Amazon Products</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>ASIN</th>
                            <th>SKU</th>
                            <th>Product Type</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.sku}>
                                <td>{product.itemName}</td>
                                <td>{product.asin}</td>
                                <td>{product.sku}</td>
                                <td>{product.productType}</td>
                                <td>{new Date(product.createdDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;