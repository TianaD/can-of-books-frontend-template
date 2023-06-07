import React from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header() {
  const { authenticatedUser } = useAuth0();
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

      <Navbar.Brand>My Favorite Books</Navbar.Brand>

      <NavItem>

        <Link as={Link} to="/">Home</Link>
        <Link as={Link} to="/about">About</Link>
        <Link as={Link} to="/profile">Profile</Link>
        {!authenticatedUser ? <LoginButton /> : <LogoutButton />}

      </NavItem>

    </Navbar>
  );
}


export default Header;
