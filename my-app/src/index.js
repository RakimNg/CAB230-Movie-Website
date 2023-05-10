import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Homepage } from './component/homepage';
import { MoviesLib } from './component/Movies';
import { MoviePage, SearchMovieID } from './component/movie';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
import { Register } from './component/register';
import { Login } from './component/login';
const router = createBrowserRouter([{
  path: "/",
  element: (<Homepage />),
},
{
  // element: <p>Heelo</p>,
  path: "movies",
  element: (<MoviesLib />)

},
{
  path: "movie",
  element: (<MoviePage />)
},
{
  path: "register",
  element: (<Register />)
},
{
  path: "login",
  element: (<Login />)
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
