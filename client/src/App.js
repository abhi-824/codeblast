import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Informations from "./components/Informations";
import Chatbox from "./components/Chatbox";
import Footer from "./components/Footer";
import Contest from "./components/Contest";
import Sidebar from "./components/Sidebar";
import Winner from "./components/Winner";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Navbar />
            <Hero />
            <Informations />
            <Footer />
          </Route>
          <Route path="/dashboard/:handle">
            <Navbar />
            <Dashboard />
            <Informations />
            <Footer />
          </Route>
          <Route path="/readyroom/:contest_id/:handle">
            <Chatbox />
            <Sidebar />
          </Route>
          <Route path="/contest/:contest_id/:handle">
            <Contest />
            <Winner />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}