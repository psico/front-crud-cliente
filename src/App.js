import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

import './global.css';
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Cliente from "./components/Cliente";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cliente" component={Cliente}/>
          {/*<Route exact path="/register" component={Register}/>*/}
          {/*<Route exact path="/cliente/new" component={New}/>*/}
        </Switch>
      </BrowserRouter>
  );
}

export default App;
