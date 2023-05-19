import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Nav, NavItem, Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel, Label, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Homepage } from './component/homepage';
import { PersonPage } from './component/person';
import { MoviesLib } from './component/library';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
import { Register } from './component/register';
import { Login } from './component/login';
import { MoviePage } from './component/movie';
import { SearchPerson } from './component/searchPerson';
import { LogOutPage } from './component/logout';
import { PageNotFound } from './component/404';
import { SettingPage } from './component/setting';
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
  path: "movie/:imdbID",
  element: (<MoviePage />)
},
{
  path: "register",
  element: (<Register />)
},
{
  path: "login",
  element: (<Login />)
},
{
  path: "person",
  element: (<SearchPerson />)
},
{
  path: "person/:imdbID",
  element: (<PersonPage />)
},
{
  path: "logout",
  element: (<LogOutPage />)
},
{
  path: "*",
  element: (<PageNotFound />)
},
{
  path: "setting",
  element: (<SettingPage />)
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
