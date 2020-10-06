import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import { socialLogin, authenticate } from "../auth";

export default class SocialLogin extends Component {
   state = {
      redirectToReferrer: false,
   };

   responseGoogle = (response) => {
      this.props.loadingUpdate(true);

      const { name, email, googleId, imageUrl } = response.profileObj;
      const user = { name, email, password: googleId, imageUrl };
      socialLogin(user).then((data) => {
         if (data.error) {
            this.props.loadingUpdate(false);
            console.log("Error Login. Please try again..");
         } else {
            authenticate(data, () => {
               this.setState({ redirectToReferrer: true });
               this.props.loadingUpdate(false);
            });
         }
      });
   };

   render() {
      const { redirectToReferrer } = this.state;
      if (redirectToReferrer) {
         return <Redirect to="/" />;
      }
      return (
         <GoogleLogin
            clientId="490551091432-3detif4ogiq9h6tse44ld5cj9j84uplv.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
         />
      );
   }
}
