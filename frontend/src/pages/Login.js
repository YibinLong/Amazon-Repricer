import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', 
                { username, password }
            );

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || 'Please check your credentials.'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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