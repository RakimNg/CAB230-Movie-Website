import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Homepage } from './homepage';
import { MoviesLib } from './Movies';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
export function Navigation() {
    const timestamp = localStorage.getItem("timestamp")
    const new_timestamp = Date.now()
    if (new_timestamp - timestamp > 600000) {
        console.log(`token expired, time stamp: ${timestamp}, new stamp: ${new_timestamp}`)


        return (

            <div>




                <Nav
                >

                    <NavItem>
                        <NavLink to="/" activeClassName="active-link">

                            |Home==|
                        </NavLink>
                    </NavItem>
                    <NavItem>

                    </NavItem>

                    <NavItem>

                        <NavLink to="/movies" activeClassName="active-link">
                            Search==|
                        </NavLink>

                    </NavItem>
                    <NavItem className="inactive-item">
                        Search People==|
                    </NavItem>
                    <NavItem>
                        <NavLink to="/register" activeClassName="active-link">
                            Register==|
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/login" activeClassName="active-link">
                            Log in===|
                        </NavLink>
                    </NavItem>
                    <NavItem className="inactive-item">
                        {/* <NavLink> */}
                        Log Out===|
                        {/* </NavLink> */}
                    </NavItem>





                </Nav>

            </div>

        )
    }
    else {
        console.log(`token valid, time stamp: ${timestamp}, new stamp: ${new_timestamp}`)
        return (

            <div>




                <Nav
                >


                    <NavItem>
                        <NavLink to="/" activeClassName="active-link">

                            |Welcome Back! Home==|
                        </NavLink>
                    </NavItem>
                    <NavItem>

                    </NavItem>

                    <NavItem>

                        <NavLink to="/movies" activeClassName="active-link">
                            Search==|
                        </NavLink>

                    </NavItem>
                    <NavItem>
                        <NavLink to="/" activeClassName="inactive-link">

                            Search People==|
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/register" activeClassName="active-link">
                            Register==|
                        </NavLink>
                    </NavItem>
                    <NavItem className="active-item">
                        {/* <NavLink to="/login" activeClassName="inactive-link"> */}
                        Log in===|
                        {/* </NavLink> */}
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            Log Out===|
                        </NavLink>
                    </NavItem>






                </Nav>

            </div>

        )
    }
}