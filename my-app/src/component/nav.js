import { Alert } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import '../CSS/nav.css';
export function Navigation() {
    const timestamp = localStorage.getItem("timestamp")
    const new_timestamp = Date.now()
    let refreshToken = localStorage.getItem("refreshToken")
    let token = localStorage.getItem("token")
    const radioButton = localStorage.getItem("radioButton")
    const [refreshStatus, setRefreshStatus] = useState(0)
    const [localStorageValue, setLocalStorageValue] = useState('');

    const refresh = async () => {
        const response = await fetch(`http://sefdb02.qut.edu.au:3000/user/refresh`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });
        const data = await response.json()
        console.log(response)
        console.log(data)
        localStorage.setItem("token", data.bearerToken.token)
        localStorage.setItem("refreshToken", data.refreshToken.token)
        token = localStorage.getItem("token")
        refreshToken = localStorage.getItem("refreshToken")
        localStorage.setItem("timestamp", Date.now());
        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("refreshToken"))
    }

    useEffect(() => {
        const etc = '...'
        let username = localStorage.getItem('email')
        if (username && username.length > 14) {
            username = username.slice(0, 11)
            username = username + etc
        }

        console.log(username)
        setLocalStorageValue(username)
        if (refreshToken && new_timestamp - timestamp > 590000 && radioButton == 'true') {
            console.log("refresh conditions activated ")
            refresh()
            setRefreshStatus(1)

        }


    }, [])

    if (refreshStatus == 1) {
        return (

            <div>
                <nav className='nav'
                >
                    <Link to="/">
                        <a>
                            <img src='https://i.pinimg.com/564x/57/2a/4e/572a4e04db252bb959cdfd85342a1cd9.jpg' width={120} height={80} alt='logo' />
                        </a>
                        <a className='site-title'>
                            Movie Lib
                        </a>

                    </Link>
                    <ul>
                        <Link to="/movies">
                            <li>
                                <a>Search Movie</a>
                            </li>
                        </Link>
                        <Link to="/person">
                            <li>
                                <a>Search People</a>
                            </li>
                        </Link>
                        <Link to="/register">
                            <li>
                                <a>Register</a>
                            </li>
                        </Link>
                        <p>Login</p>
                        <Link to="/logout">
                            <li>
                                <a>Log Out</a>
                            </li>
                        </Link>


                        <Link to="/setting">
                            <li>

                                Setting
                            </li>

                        </Link>
                        <p>{localStorageValue}</p>
                    </ul>
                </nav>
                <div class="alert-container">
                    <Alert color="primary">
                        You login session has just been refreshed
                    </Alert>
                </div>
            </div>

        )
    }
    if ((token && new_timestamp - timestamp > 600000) || !token) {
        localStorage.removeItem("timestamp")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("token")
        console.log(`token expired, time stamp: ${timestamp}, new stamp: ${new_timestamp}`)


        return (

            <div>




                <nav className='nav'
                >
                    <Link to="/">
                        <a>
                            <img src='https://i.pinimg.com/564x/57/2a/4e/572a4e04db252bb959cdfd85342a1cd9.jpg' width={120} height={80} alt='logo' class="transparent-background" />
                        </a>
                        <a className='site-title'>
                            Movie Lib
                        </a>
                    </Link>


                    <ul>
                        <Link to="/movies">
                            <li>
                                <a>Search Movie</a>
                            </li>
                        </Link>
                        <p>Search People</p>
                        <Link to="/register">
                            <li>
                                <a>Register</a>
                            </li>
                        </Link>
                        <Link to="/login">
                            <li>
                                <a>Login</a>
                            </li>
                        </Link>
                        <p>Log Out</p>
                        <p>Setting</p>

                    </ul>




                </nav>
            </div>

        )
    }
    else {
        console.log(`token valid, time stamp: ${timestamp}, new stamp: ${new_timestamp}`)
        return (

            <div>
                <nav className='nav'
                >
                    <Link to="/">
                        <a>
                            <img src='https://i.pinimg.com/564x/57/2a/4e/572a4e04db252bb959cdfd85342a1cd9.jpg' width={120} height={80} alt='logo' />
                        </a>
                        <a className='site-title'>
                            Movie Lib
                        </a>

                    </Link>
                    <ul>
                        <Link to="/movies">
                            <li>
                                <a>Search Movie</a>
                            </li>
                        </Link>
                        <Link to="/person">
                            <li>
                                <a>Search People</a>
                            </li>
                        </Link>
                        <Link to="/register">
                            <li>
                                <a>Register</a>
                            </li>
                        </Link>
                        <p>Login</p>
                        <Link to="/logout">
                            <li>
                                <a>Log Out</a>
                            </li>
                        </Link>


                        <Link to="/setting">
                            <li>

                                Setting
                            </li>

                        </Link>
                        <s>{localStorageValue}</s>
                    </ul>
                </nav>

            </div>

        )
    }
}