import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";
import "./Header/Header.css";

export default class AppHomeNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    // const userName = JSON.parse(localStorage.getItem("user")).UserName;
    return (
      <Navbar
        className="navbar-style"
        style={{ backgroundColor: "#135E70" }}
        light
      >
        <NavbarBrand tag={Link} to="/" style={{ marginLeft: "100px" }}>
          <div className="headerNav">
            <div className="bp3-navbar-group-2">
              <Link to="/">
                <div className="navbar-elem underline">Home</div>
              </Link>

            </div>
          </div>
        </NavbarBrand>
        <Nav></Nav>
      </Navbar>
    );
  }
}
