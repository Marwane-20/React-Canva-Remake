import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
export default () => {
  return (
    <Navbar id="navbar" bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#link">
            <button>click</button>
          </Nav.Link>
          <NavDropdown
            style={{ display: "flex" }}
            title="Dropdown"
            id="basic-nav-dropdown"
          >
            <img
              style={{ margin: 2 }}
              src="https://dummyimage.com/200x100/000/fff.jpg"
            />
            <img src="https://dummyimage.com/200x100/000/fff.jpg" />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
