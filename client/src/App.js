import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Chatbox from "./components/Chatbox";
import Footer from "./components/Footer";
import Contest from "./components/Contest";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ChoosingBar from "./components/ChoosingBar";
import { useEffect, useState } from "react";
import Questions from "./components/Questions";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactGa from 'react-ga'
import loaderImage from "./resources/logo_animation.mp4"
const handles = ["lord"];
console.log(window.location.href[7])
if(window.location.href[4]!='s'&&window.location.href[7]=='c')window.location.href="https://codeblast.herokuapp.com"
export default function App() {
  useEffect(() => {
    ReactGa.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGa.pageview('/')
  },[])
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
