import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            /*
            // TODO: UNCOMMENT THIS TO RE-ENABLE OAUTH - REMOVE navigate('/dashboard'); WHEN RE-ENABLING OAUTH
            alert('Login successful! Redirecting to Amazon for authentication...');
            if (data.redirectToAmazon) {
                // Make a request to your backend to initiate Amazon OAuth
                window.location.href = 'http://localhost:3001/api/amazon-auth/login';
            } else {
                window.location.href = '/dashboard'; // Redirect to dashboard
            }
            */
            navigate('/dashboard');
        } else {
            const errorData = await response.json(); 
            alert('Login failed: ' + (errorData.message || 'Please check your credentials.'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;