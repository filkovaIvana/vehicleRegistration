import * as React from 'react';
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import './Header';

 const PreAuthHeader = () =>
 (

          <div className="above-header postHeader header row">
            <nav >
                <div className="headerNav bp3-navbar-group">
                 
                  <div className="image-header-box image-box">
                      <a href="/">
                        <img className="img-style" alt="" src={logoImg} />
                      </a>
                  </div>
                    
                  <div className="bp3-navbar-grou2">
                      <div className="headerBox">
                          <Link to="/login" className="bp3-navbar-heading link-style">
                            <span className="link-style"> Login </span>               
                          </Link>
                      </div>
                      <div className="headerBox">
                          <Link to="/signup" className="bp3-navbar-heading">
                              <span className="link-style"> SignUp </span>
                          </Link>
                      </div>
                  </div>                   
                </div>
             </nav>
          
          <br/>
          <br/> <br/>
        </div>     
);
export default PreAuthHeader;
