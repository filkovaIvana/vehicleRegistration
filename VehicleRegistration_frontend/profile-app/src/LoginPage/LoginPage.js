import React from 'react';
import { connect } from 'react-redux';
import * as jwt_decode from "jwt-decode";
import './LoginPage.css';
import AppNavbar from "../AppNavbar";
import { api_server } from '../config/App.config';

type State = {
  username: string,
  password: string,
  submitted: boolean,
  hasError: boolean,
}

class LoginPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    // reset login status
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.state = {
      username: "",
      password: "",
      submitted: false,
      hasError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

 extractJWT(headers) {
  const authStr = headers.get('Authorization');
  if (!!authStr) {
    const authStrParts = authStr.split(' ');
    if (authStrParts.length === 2) {
      return authStrParts[1];
    }
  }
  return null;
}

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    

    const { username, password } = this.state;
    if (username && password) {
      let pom = "";
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ username, password })
      };

      return fetch(api_server +`/login`, requestOptions)
        .then(response => {
          const jwt = this.extractJWT(response.headers);
          pom = jwt;
          if (jwt !== null) {
            const tokenContent = jwt_decode(jwt);
            localStorage.setItem("token", jwt);

            localStorage.setItem("tokenContent", JSON.stringify(tokenContent));
            const requestOptions1 = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
              }
            };
            console.log(requestOptions1);
          }
          if(response.ok) {
            this.setState({ hasError: false });
            return response;
          }
          else {
            this.setState({ hasError: true });
            return;
          }
        })
        .then(response => response ? response.json() : '')
        .then(data => {
          if(data) {
            this.setState({ hasError: false });
          localStorage.setItem('user', JSON.stringify(data));
          }
          return pom;
        })
        .then(pom => {
         if(pom){
          this.props.history.push("/");
         }
          return pom;
        })
    }
    this.setState({ hasError: true });
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted, hasError } = this.state;
    
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style={{ height: '100vw', background:'#AAB4B5' }}>
        <AppNavbar />
      <div className="login-style">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.handleChange}
            />
            {hasError && submitted && password && username && (
            <span className="errorMsg">Invalid username or password!</span>
            )}
            <span className={hasError ? "errorMsg-psw" : "psw"}>Forgot password?</span>
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button  className={hasError ? "errorMsg-btn" : "btn btn-primary"}>Login</button>
            {loggingIn && (
              <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>
        </form>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 