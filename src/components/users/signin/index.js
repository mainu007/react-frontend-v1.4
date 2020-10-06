import React, { Component } from "react";
import Error from "../../Error";
import SignInForm from "./SigninFrom";
import { Redirect, withRouter } from "react-router-dom";
import { signin, authenticate } from "../auth";

class SignIn extends Component {
   state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      reCaptcha1: "",
      reCaptcha2: "",
      reCaptchaAnswer: "",
      redirectToHome: false,
   };

   handleChange = (name) => (event) => {
      this.setState({
         error: "",
         [name]: event.target.value,
      });
   };

   clickSubmit = (event) => {
      event.preventDefault();
      if (this.isValid()) {
         this.setState({ loading: true });
         const { email, password } = this.state;
         const user = { email, password };
         signin(user).then((data) => {
            if (data.error) {
               this.setState({ error: data.error, loading: false });
            } else {
               //authenticate
               authenticate(data, () => {
                  console.log("sing in");
               });
               this.setState({ redirectToHome: true });
            }
         });
      }
   };

   //client side form validation
   isValid = () => {
      const {
         email,
         password,
         reCaptcha1,
         reCaptcha2,
         reCaptchaAnswer,
      } = this.state;
      const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailCheck.test(email)) {
         this.setState({
            error: "A valid Email is require",
            loading: false,
         });
         return false;
      }
      if (!password > 0) {
         this.setState({ error: "Password is require", loading: false });
         return false;
      }
      //reCaptcha
      const reCaptcha = reCaptcha1 + reCaptcha2;
      if (reCaptcha !== Number(reCaptchaAnswer)) {
         this.setState({ error: "Captcha: Wrong Answer!", loading: false });
         return false;
      }
      return true;
   };

   loadingUpdate = (value) => {
      this.setState({ loading: value });
   };

   componentDidMount() {
      const reCaptcha1 = Math.round(Math.random() * 19 + 1);
      const reCaptcha2 = Math.round(Math.random() * 9 + 1);
      this.setState({ reCaptcha1, reCaptcha2 });
   }

   render() {
      if (this.state.redirectToHome) {
         return <Redirect to="/" />;
      }
      return (
         <div className="container">
            <h2 className="my-5">Sign In</h2>

            <Error message={this.state.error} alertColor={"danger"} />
            <SignInForm
               handleChange={this.handleChange}
               clickSubmit={this.clickSubmit}
               loadingUpdate={this.loadingUpdate}
               {...this.state}
            />
         </div>
      );
   }
}

export default withRouter(SignIn);
