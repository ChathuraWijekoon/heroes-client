import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Heroes from "./components/Heroes";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import HeroDetails from "./components/HeroDetails";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <Route exact path="/" component={Home} />
    <Route exact path="/heroes" component={Heroes} />
    <Route exact path="/heroes/:id" component={HeroDetails} />
  </BrowserRouter>,
  document.getElementById("root")
);
