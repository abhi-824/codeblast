import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
          <Route path="/dashboard">
            <Navbar />
            <Dashboard />
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
