import React, { Component } from "react";
import Error from "../../Error";
import SignupForm from "./SignupForm";
import { signup } from "../auth";
import { Link } from "react-router-dom";

export default class Signup extends Component {
   state = {
      name: "",
      email: "",
      password: "",
      error: "",
      success: false,
      loading: false,
   };

   handleChange = (name) => (event) => {
      this.setState({
         error: "",
         [name]: event.target.value,
      });
   };

   clickSubmit = (event) => {
      event.preventDefault();
      this.setState({ loading: true });
      const { name, email, password } = this.state;
      const user = { name, email, password };
      signup(user).then((data) => {
         if (data.error) this.setState({ error: data.error, loading: false });
         else
            this.setState({
               name: "",
               email: "",
               password: "",
               error: "",
               success: true,
               loading: false,
            });
      });
   };

   render() {
      const { error, success } = this.state;
      return (
         <div className="container">
            <h2 className="my-5">Signup</h2>

            <Error message={error} alertColor={"danger"} />
            {
               <div
                  className={`alert alert-success`}
                  style={{ display: success ? "" : "none" }}
               >
                  Account create successfully! Please{" "}
                  <Link to="/signin">Sign In</Link>.
               </div>
            }

            <SignupForm
               handleChange={this.handleChange}
               clickSubmit={this.clickSubmit}
               {...this.state}
            />
         </div>
      );
   }
}
