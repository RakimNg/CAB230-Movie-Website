import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../CSS/RegisterAndLogin.css';

export function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState()
    const [status, setStatus] = useState()

    const fetchData = async () => {
        const response = await fetch('http://sefdb02.qut.edu.au:3000/user/register', {
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

        setStatus(response.status)
        const data = await response.json()
        console.log(data)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            setAlert(true)
            return false
        }
        console.log(`Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
        fetchData()
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        // navigate('/login');
    };

    if (alert) {
        return (
            <div>
                <Alert color="danger">
                    <p style={{ display: 'flex', justifyContent: 'center' }}> Your two passwords are different!</p>
                </Alert>

                <div className="page-container">

                    <div className="panel">
                        <h2>Register</h2>
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
                                <label htmlFor="confirm-password">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit">Register</button>
                            <div>
                                <Link to={'/login'}> I have an account already </Link>
                            </div>
                            <div>
                                <Link to={'/'}> Visitor Mode </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
    if (status === 409) {
        return (
            <div>
                <Alert color="warning">
                    <p style={{ display: 'flex', justifyContent: 'center' }}> Account Already Exists!</p>
                </Alert>


                <div className="page-container">
                    <div className="panel">
                        <h2>Register</h2>
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
                                <label htmlFor="confirm-password">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Register</button>
                            <div>
                                <Link to={'/login'}> I have an account already </Link>
                            </div>
                            <div>
                                <Link to={'/'}> Visitor Mode </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            {status === 201 && <Alert color="primary">
                <p style={{ display: 'flex', justifyContent: 'center' }}> Account Created!</p>
            </Alert>}
            <div className="page-container">
                <div className="panel">
                    <h2>Register</h2>
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
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                        <div>
                            <Link to={'/login'}> I have an account already </Link>
                        </div>
                        <div>
                            <Link to={'/'}> Visitor Mode </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

