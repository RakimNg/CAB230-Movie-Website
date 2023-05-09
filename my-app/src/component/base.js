import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { Homepage } from './homepage';
import { MoviesLib } from './Movies';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
export function Navigation() {
    const EmptyComponent = () => null;
    const [title, setTitle] = useState([]);

    return (

        <div>

            {/* <Routes>

                    <Route exact path="/movies" element={<MoviesLib />} />
                    <Route component={EmptyComponent} />
                </Routes> */}



            <Nav
            >
                <NavItem>
                    <NavLink to="/" activeClassName="active-link">

                        Home
                    </NavLink>
                </NavItem>
                <NavItem>

                    <NavLink to="/movies" activeClassName="active-link">
                        Movies
                    </NavLink>

                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        My Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Register
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        Log in/out
                    </NavLink>
                </NavItem>


                <NavItem>
                    <Input
                        id="searchMovie"
                        name="search"
                        placeholder="Movie Name"
                        type="name"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />

                </NavItem>


            </Nav>
            <p>{title}</p>
        </div>

    )
}