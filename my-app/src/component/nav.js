import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Homepage } from './homepage';
import { MoviesLib } from './library';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink, Link } from "react-router-dom";
import '../CSS/nav.css';
export function Navigation() {
    const timestamp = localStorage.getItem("timestamp")
    const new_timestamp = Date.now()
    const token = localStorage.getItem("token")
    if (!token || new_timestamp - timestamp > 600000) {
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

                    </ul>




                </nav>

            </div>

        )
    }
}