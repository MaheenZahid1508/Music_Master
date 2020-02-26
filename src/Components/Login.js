import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from "react-router-dom";
class Login extends Component {
    state = {
        authenticated: false,
        profile: {}
    };
    responseGoogle = (response) => {
        this.setState({authenticated: true, profile: response.profileObj})
    };
    responseGoogleFailure = response => {
        alert(response.error);
    };

    render() {
const API_KEY=`${process.env.REACT_GOOGLE_LOGIN_KEY}`;
        if (this.state.authenticated) {
            return <Redirect
                to={{
                    pathname: '/App',
                    state: {profile: this.state.profile}
                }}/>
        } else if (this.props.location.state != null) {
            alert("You are not authorized Sign in First");
        }
        return (
            <div>
                <h1>Login To Music Master</h1>
                <GoogleLogin
                clientId={API_KEY}
                    buttonText="Login with GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}
export default Login;
