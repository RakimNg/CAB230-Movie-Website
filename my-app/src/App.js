
import 'bootstrap/dist/css/bootstrap.min.css';
import { Homepage, useData } from './component/homepage';
import MyComponent from './component/library';
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText, CardSubtitle, Button, CardImg, UncontrolledCarousel } from 'reactstrap';
// import axios from 'axios'



export default function App() {

  return (

    <div className="App">

      <Homepage />

    </div>
  );
}






