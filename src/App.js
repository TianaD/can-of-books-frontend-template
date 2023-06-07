import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import { useAuth0 } from "@auth0/auth0-react";
import Welcome from './Welcome';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            exact path="/profile"
            element={<Profile />}
          >
          </Route>
          <Route
            exact path="/about"
            element={<About />}
          >
          </Route>
          <Route
            path="/"
            element={isAuthenticated ? <BestBooks /> : <Welcome />}
          >
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}


export default App;
