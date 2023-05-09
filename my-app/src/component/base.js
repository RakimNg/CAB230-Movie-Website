import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Homepage } from './homepage';
import { MoviesLib } from './Movies';
import { Routes, Route, useNavigate } from 'react-router-dom';
export function Navigation() {


    const [title, setTitle] = useState([]);
    return (
        <BrowserRouter>
            <div>

                <Routes>

                    <Route exact path="/movies" element={<MoviesLib />} />
                </Routes>



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
        </BrowserRouter>
    )
}