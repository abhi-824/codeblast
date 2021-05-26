import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Chatbox from "./components/Chatbox";
import Footer from "./components/Footer";
import Contest from "./components/Contest";
import Sidebar from "./components/Sidebar";
import Winner from "./components/Winner";
import Dashboard from "./components/Dashboard";
import ChoosingBar from "./components/ChoosingBar";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Questions from "./components/Questions";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import loaderImage from "./resources/logo_animation.mp4"
const handles = ["lord"];
const link = "http://" + window.location.href.split("/")[2];
console.log(link);
const ENDPOINT = link;
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard/:handle">
            <Navbar />
            <Dashboard />
            <Footer />
          </Route>
          <Route path="/readyroom/:contest_id">
            <Navbar />
              <div className="ready-page">
                <Chatbox />
                <Sidebar handles={handles} />
              </div>
          </Route>
          <Route path="/contest/:contest_id">
            <Navbar />
            <div className="contest-page">
              <div className="problem-standing">
                <ChoosingBar />
                <Route path="/contest/:contest_id/standings">
                  <Contest />
                </Route>
                <Route path="/contest/:contest_id/problems">
                  <Questions />
                </Route>
              </div>
              <Winner />
            </div>
            <Footer />
          </Route>
          <Route path="/">
            <Navbar />
            <Hero />
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
