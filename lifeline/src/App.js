// author: @dudash
// license: Apache 2.0
import React from 'react';
// import openshiftlogo from './images/openshift.png';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import HomePage from "./components/HomePage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './App.css';
const history = createHistory();

function App({stateStore}) {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark">
          <Navbar.Brand href="#home">Emergency Lifeline App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" active>
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={props => (
            <HomePage {...props} stateStore={stateStore} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
