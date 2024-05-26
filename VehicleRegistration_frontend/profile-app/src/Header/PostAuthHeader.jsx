import * as React from 'react';
import {Link, withRouter} from "react-router-dom";
import './Header';
import {  Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import logoImg from "../assets/images/logo.png";
import "../assets/fontello/css/fontello.css";
import "../assets/fontello/css/fontello-codes.css";

class PostAuthHeader extends React.Component {
 
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    
    this.state = {
      searchQuestion: false,
      searching: false,
    };
  }

   onLogout() {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    this.props.history.push('/login')
};

   renderUser() {
    const currentUser = localStorage.getItem("user");
     if (currentUser === 'null') {
      return;
    }

    const userName = JSON.parse(currentUser).UserName;
    return (
      <div>
        <span className="userInfo">
          {userName}
          <i className="fontello icon-user" />
        </span>
      </div>
    );
  }

   render() {

        return (
          <div className="above-header postHeader header row">
            <nav>
              <div className="headerNav bp3-navbar-group app-margin">
                <div className="image-header-box image-box">
                  <a href="/">
                    <img className="img-style" alt="" src={logoImg} />
                  </a>
                </div>
                <div className="header-title">
                  {" "}
                  Vehicle Registration Page
                    <div className="header-subtitle">
                    CHOOSE OUR REGISTRATION SERVICES
                    </div>
                </div>
                <div className="bp3-navbar-grou2">
                  <div className="direction">
                    
                  
                    <div className="headerBox">
                      <div className="settings">
                        <div className="search-group">
                          <div>
                            <span className="bp3-navbar-heading">
                              <Link to="/search" className="bp3-navbar-heading">
                                {" "}
                                <i className="fontello icon-search" />{" "}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="headerBox">{this.renderUser()} </div>

                    <div className="headerBox">
                      <div className="settings">
                        {localStorage.getItem("token") && (
                          <Popover
                            content={
                              <Menu>
                                <MenuItem
                                  text="Logout"
                                  className="bp3-icon-standard bp3-icon-log-out"
                                  onClick={this.onLogout}
                                />
                              </Menu>
                            }
                            position={Position.BOTTOM}
                          >
                            <div>
                              <span className="bp3-icon-standard bp3-icon-cog" />{" "}
                            </div>
                          </Popover>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </nav>
            <br />
            <br /> <br />
          </div>
        );
  }
}

export default withRouter(PostAuthHeader)