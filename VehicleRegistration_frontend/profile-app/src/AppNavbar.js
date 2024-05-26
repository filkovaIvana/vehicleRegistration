import React from 'react';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./App.css";
import "./Header/Header.css";

type State = {
  isOpen: boolean,
}

export default class AppNavbar extends React.Component<Props, State> {
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
    return (
      <div>
        <Navbar
          className="navbar-style"
          style={{ backgroundColor: "#135E70" }}
          light
        >
          <NavbarBrand tag={Link} to="/" className="app-margin">
            <div className="headerNav">
              <div className="bp3-navbar-group-2">
                <Link className="no-underline" to="/">
                  <div className="navbar-elem underline"> Home</div>
                </Link>
                                 {/* { (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).Role === "ROLE_USER") && */}

                 { (JSON.parse(localStorage.getItem("user")) &&
                <div className="navbar-elem-with-sub">
                  <div className="menu1 underline">
                    Configuration
                    <ul className="list1">
                      <li className="submenu-item">
                        <Link className="no-underline" to="/statistics">
                          <div className="navbar-elem">
                            Registration statistics
                           </div>
                        </Link>
                      </li>
                      <li className="submenu-item">
                        <Link className="no-underline" to="/registration">
                          <div className="navbar-elem">
                            Register vehicle
                           </div>
                        </Link>
                        
                      </li>
                      
                    </ul>
                  </div>
                </div>
                  ) } 

              </div>
            </div>
          </NavbarBrand>
          <Nav></Nav>
        </Navbar>
      </div>
    );
  }
}