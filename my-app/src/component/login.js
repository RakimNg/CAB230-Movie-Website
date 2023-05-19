import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/RegisterAndLogin.css'; // import CSS file for styling
import { Register } from './register';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        fetch('http://sefdb02.qut.edu.au:3000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

            .then(response => response.json())
            .then(data => {
                console.log(data);
                // console.log(res)
                localStorage.setItem("token", data.bearerToken.token);

                localStorage.setItem("refreshToken", data.refreshToken.token)
                console.log(data.refreshToken.token)
                localStorage.setItem("timestamp", Date.now());
                // console.log(res);
            })



            .catch(error => {
                console.error('Error logging in:', error);
                setError('An unexpected error occurred. Please try again later.');
            })
        if (!error) {
            navigate('/')
        }


    };

    return (
        <div className="page-container">
            <div className="panel">
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
                    <div>
                        {error && <p>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

