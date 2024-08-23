// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/Form.css'
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 6;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!specialCharPattern.test(password)) {
            return 'Password must contain at least one special character.';
        }
        return '';
    };

    const handleRegister = () => {
        const passwordError = validatePassword(password);
        if (username && password && !passwordError) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                setError('Username already exists.');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful');
                navigate('/login');
            }
        } else {
            setError(passwordError || 'Please fill in all fields.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            {/* <nav ><Link to="/Login">Click here to Login</Link></nav> */}

        </div>
    );
}

export default Register;