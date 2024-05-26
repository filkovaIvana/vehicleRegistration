import * as React from "react";
import './Registration.css';
import LabelledTypeahead from '../LabelledTypeahead';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { api_server } from '../config/App.config';
import DatePicker from "react-datepicker";
import {  Row, Col, Container, Form, FormGroup, Label, } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import HomeNavigationTools from "../HomeNavigationTools";

type Props = {};
type State = {
  userInput: string,
  record: {},
  searchUserResults: [],
  uniqueCountries: [],
  searchingInstitutions: boolean,
  searchingUsers: boolean,
  registrationCode: string,
  validUntil: Date,
  registerNotification: string,
  success: boolean,
  submitted: boolean
};

class CheckRegistrationValidity extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onUserSearch = this.onUserSearch.bind(this);
    this.onUserAreaSearch = this.onUserAreaSearch.bind(this);
    // this.setExpireDate = this.setExpireDate.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);

    this.state = {
      // What the user has entered
      userInput: "",
      record: {},
      searchUserResults: [],
      uniqueCountries: [],
      searchingInstitutions: false,
      searchingUsers: false,
      registrationCode: "",
      validUntil: new Date(),
      registerNotification: "",
      success: false,
      submitted: false,

    };
  }

  fieldChangeHandler = (e) => {
  const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("set registerCode: " + this.state.registrationCode);

    // if (typeof value === "string" || value instanceof String) {
    //   this.setState({ userInput: value });
    // }
    // else if(name.length > 0) {
    //   this.setState({ userInput: name[0].name });
    // }
    // else {
    //   if (value !== undefined || typeof value !== "undefined") {
    //     this.setState({ userInput: value.name });
    //     const userIn = value.name;
    //     const requestOptions = {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //       },
    //       body: userIn
    //     };

    //     fetch(api_server + `/crudApi/searchUsers`, requestOptions)
    //       .then(response => response.json())
    //       .then(data => {
    //         this.setState({ searchUserResults: data });
    //       });
    //   }
    // }
  };

  onInputChange = (value, e) => {
    if (typeof value === "string" || value instanceof String) {
      this.setState({ userInput: value });
    }
    else {
      if (value !== undefined || typeof value !== "undefined") {
        this.setState({ userInput: value.name });
        this.onSearch();
      }
    }

    if (e.keyCode === 13) {
      this.onSearch();
    }
  };

  handleChange1(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("set registerCode: " + this.state.registrationCode);
  };



//     setExpireDate = (date, e) => {
//   console.log("THIS DATE: " + date);
//       this.setState({ validUntil: date });
  
  
//   };

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({registerNotification: ""});
    this.setState({ submitted: true });
    

    const { registrationCode } = this.state;
    if (registrationCode ) {
      const jwt = localStorage.getItem("token");
      console.log("CURRENT JWT: " + jwt);
      let pom = "";
      const requestOptions = {
        method: 'GET',
        headers: { 'registrationcode': `${registrationCode}`, 'Content-Type': 'application/json' },
        // body: JSON.stringify({ registrationCode })
      };

      return fetch(api_server +`/api/registration`, requestOptions)
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
            this.setState({ hasError: false, success: true });
            return response;
          }
          else {
            this.setState({ hasError: true });
            return;
          }
        })
        .then(response => response ? response.json() : '')
        .then(data => {
                  console.log("Registration validation status: " + data.message + ", valid until: " + data.validUntil);
          // this.setState({ registerNotification: ("description: " + data.description + ", generated password: " + data.password + ", success: " + data.success) });
            this.setState({registerNotification: ("Registration validation status: " + data.message + " Valid until: " + data.validUntil)});

          if(data) {
            console.log("Data returned: " + data);
        //     this.setState({ hasError: false });
        //   localStorage.setItem('user', JSON.stringify(data));
        //   }
        //   return pom;
        // this.setState({success: data.success})
         
        //  this.props.history.push("/login");
          }
        })
        // .then(pom => {
        //  if(pom){
         
        //  }
          // return pom;
        // })
    }
    // this.setState({ hasError: true });
  }


  onSearch = () => {
    this.setState({ searchingUsers: false });
    this.setState({ searchingInstitutions: true });
  };

  onUserSearch = () => {
    this.setState({ searchingInstitutions: false });
    this.setState({ searchingUsers: true });

    const userIn = this.state.userInput;
    
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: userIn
    };

    this.setState({ searchingUsers: true });

    fetch(api_server + `/crudApi/searchUsers`, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ searchUserResults: [] });
        return data;
      })
      .then(data => {
        this.setState({ searchUserResults: data });
      });
  };

  onUserAreaSearch = () => {
    this.setState({ searchingInstitutions: false });
    this.setState({ searchingUsers: true });

    const userIn = this.state.userInput;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: userIn
    };

    this.setState({ searchingUsers: true });
    fetch(api_server + `/crudApi/searchUsersByArea`, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ searchUserResults: [] });
        return data;
      })
      .then(data => {
        this.setState({ searchUserResults: data });
      });
  };

  render() {
    
    const { registrationCode, validUntil, submitted, hasError, registerNotification, success } = this.state;
    return (
      <div className="main-box-auto">
         <HomeNavigationTools /> 
        <div className="search-box">
          <div className="search-input">
            <div className="separate-search">
             
        { !submitted && <h2> Check registration validity </h2> }
        { !success && (
      <form className = "f1" name="form" onSubmit={this.handleSubmit}>
            <label htmlFor="registrationCode">Registration code</label>
            <input
              type="text"
              className="form-control"
              name="registrationCode"
              placeholder="Enter registration code for validation check"
              value={registrationCode}
              onChange={this.fieldChangeHandler}
            />
               {submitted && !registrationCode && (
              <div className="help-block">Registration code is required</div>
            )}
               
 
     {!success && submitted && registrationCode && (
            <span className="errorMsg">Registration code doesn't exist. Use another registration code !</span>
            )}

            <button  className={hasError ? "errorMsg-btn" : "btn btn-primary"}>Ckeck validity</button>
        </form> )}
         {success && submitted &&
      <h1>{registerNotification}</h1>} 
            </div>
            
          </div>
        </div>

      </div>
    );

  }
}

// function mapStateToProps(state) {
// }

// const connectedAutocompletePage = connect(mapStateToProps)(Autocomplete);
// export { connectedAutocompletePage as Autocomplete }; 
export default CheckRegistrationValidity;

