
import 'bootstrap/dist/css/bootstrap.min.css';
import { Homepage, useData } from './component/homepage';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Router, Route, NavLink } from "react-router-dom";
import MyComponent from './component/Movies';
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel } from 'reactstrap';
// import axios from 'axios'



export default function App() {

  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      {/* other routes */}
    </Router>
  );
}






