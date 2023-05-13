import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Homepage } from './homepage';
import { MoviesLib } from './Movies';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
export function Navigation() {
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
                <NavItem>
                    <NavLink href="#">
                        My Profile==|
                    </NavLink>
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
                <NavItem>
                    <NavLink>
                        Log Out===|
                    </NavLink>
                </NavItem>





            </Nav>

        </div>

    )
}