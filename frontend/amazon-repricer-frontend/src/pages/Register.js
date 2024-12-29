import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: add more error handling

        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert('Registration successful!');
        } else {
            const errorData = await response.json(); 
            console.error('Registration failed:', errorData); // log the error
            setError(errorData.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input 
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
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
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register