import * as React from 'react';
import PostAuthHeader from './PostAuthHeader';
import PreAuthHeader from './PreAuthHeader';
import './Header.css';
import { withRouter} from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            user: null 
        };

    }

    componentDidMount() {
        this.setState({ user: localStorage.getItem("user")});
    }

     render() {
         const userLoggedIn = localStorage.getItem("user");
         return userLoggedIn ? <PostAuthHeader /> : <PreAuthHeader />
    }
}

export default withRouter(Header)







