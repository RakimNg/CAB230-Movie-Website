import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterAndLogin.css'; // import CSS file for styling
import { Register } from './register';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div className="register-page-container">
            <div className="register-panel">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                    <div>
                        <Link to={'/register'}> Don't have an account? </Link>
                    </div>
                    <div>
                        <Link to={'/'}> Visitor Mode </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

