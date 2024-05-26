import React from 'react';
import { connect } from 'react-redux';
import * as jwt_decode from "jwt-decode";
import './SignUpPage.css';
import AppNavbar from "../AppNavbar";
import { api_server } from '../config/App.config';

type State = {
  id: string,
  firstname: string,
  lastname: string,
  // password: string,
  submitted: boolean,
  hasError: boolean,
  registerNotification: string,
  signingUp: boolean,
  success: boolean
}

class SignUpPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    // reset signup status
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.state = {
      id: "",
      firstname: "",
      lastname: "",
      // password: "",
      submitted: false,
      hasError: false,
      registerNotification: "",
      signingUp: false,
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ submitted: false });

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
    this.setState({registerNotification: ""});
    this.setState({ submitted: true });
    

    const { id, firstname, lastname } = this.state;
    if (id && firstname && lastname) {
      let pom = "";
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id, firstname, lastname })
      };

      return fetch(api_server +`/account`, requestOptions)
        .then(response => { console.log("HERE: " + response.stringify);
          // const jwt = this.extractJWT(response.headers);
          // pom = jwt;
          // if (jwt !== null) {
          //   const tokenContent = jwt_decode(jwt);
          //   localStorage.setItem("token", jwt);

          //   localStorage.setItem("tokenContent", JSON.stringify(tokenContent));
          //   const requestOptions1 = {
          //     method: "GET",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${jwt}`
          //     }
          //   };
          //   console.log(requestOptions1);
          // }
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
                  console.log("Data returned - description: " + data.description + ", generated password: " + data.password + ", success: " + data.success);
          // this.setState({ registerNotification: ("description: " + data.description + ", generated password: " + data.password + ", success: " + data.success) });
          if(data.success == true){ this.setState({registerNotification: (data.description + " Use password: " + data.password)});}
          else {
            this.setState({registerNotification: (data.description)});
          }

          if(data) {
            console.log("Data returned: " + data);
        //     this.setState({ hasError: false });
        //   localStorage.setItem('user', JSON.stringify(data));
        //   }
        //   return pom;
        this.setState({success: data.success})
         
        //  this.props.history.push("/login");
          }
        })
        // .then(pom => {
        //  if(pom){
         
        //  }
          // return pom;
        // })
    }
    this.setState({ hasError: true });
  }

  render() {
    const { signingUp } = this.props;
    const { id, firstname, lastname, submitted, hasError, registerNotification, success } = this.state;
    
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style={{ height: '100vw', background:'#AAB4B5' }}>
        <AppNavbar />
      <div className="login-style">
        { !submitted && <h2>SignUp</h2> }
        { !success && (
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !id && !firstname && !lastname ? " has-error" : "")
            }
          >
            <label htmlFor="id">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="id"
              value={id}
              onChange={this.handleChange}
            />
            {submitted && !id && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            // className={
            //   "form-group" + (submitted && !password ? " has-error" : "")
            // }
          >
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              placeholder="Enter Firstname"
              value={firstname}
              onChange={this.handleChange}
            />
            {submitted && !firstname && (
              <div className="help-block">Fisrtname is required</div>
            )}

            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              placeholder="Enter Lastname"
              value={lastname}
              onChange={this.handleChange}
            />
            {submitted && !lastname && (
              <div className="help-block">Lastname is required</div>
            )}    

            {!success && submitted && firstname && id && lastname && (
            <span className="errorMsg">{registerNotification}. Use another username !</span>
            )}
            {/* <span className={hasError ? "errorMsg-psw" : "psw"}>Forgot password?</span>
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )} */}
          </div>
          <div className="form-group">
            <button  className={hasError ? "errorMsg-btn" : "btn btn-primary"}>SignUp</button>
            {/* {(
              <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )} */}
          </div>
        </form>
         )}
       {success && submitted &&
      <h1>{registerNotification}</h1>} 
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage }; 