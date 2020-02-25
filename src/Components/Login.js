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
                <h1>Login</h1>
                <GoogleLogin
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
