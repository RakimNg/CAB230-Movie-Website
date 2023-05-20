import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/RegisterAndLogin.css'; // import CSS file for styling
import { Register } from './register';
import { Alert } from 'reactstrap';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [wrongPWD, setWrongPWD] = useState(false)
    const navigate = useNavigate();
    const PostData = async () => {
        try {
            const response = await fetch('http://sefdb02.qut.edu.au:3000/user/login', {
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
            if (response.status == 401) {
                setWrongPWD(true)
            }
            else {
                const data = await response.json()
                console.log(data);
                // console.log(res)
                localStorage.setItem("token", data.bearerToken.token);

                localStorage.setItem("refreshToken", data.refreshToken.token)
                console.log(data.refreshToken.token)
                localStorage.setItem("timestamp", Date.now());
                setWrongPWD(false)
                navigate('/')
            }

        }
        catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred. Please try again later.');
        }



    }
    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("email", email)
        console.log(`Email: ${email}, Password: ${password}`);
        PostData()
    };


    return (
        <div>
            {wrongPWD && <Alert color="danger">
                <p style={{ display: 'flex', justifyContent: 'center' }}>Wrong email or password!</p>
            </Alert>}
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
        </div>

    );
}

