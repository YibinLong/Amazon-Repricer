import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/auth/login', {
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
            alert('Login successful! Redirecting to Amazon for authentication...');
            if (data.redirectToAmazon) {
                // Make a request to your backend to initiate Amazon OAuth
                window.location.href = 'http://localhost:3000/api/amazon-auth/login';
            } else {
                window.location.href = '/dashboard'; // Redirect to dashboard
            }
        } else {
            const errorData = await response.json(); 
            console.error('Login failed:', errorData); // log the error
            alert('Login failed: ' + (errorData.message || 'Please check your credentials.'));
        }
    }

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