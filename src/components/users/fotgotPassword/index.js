import React, { Component } from "react";
import { forgotPassword } from "../api";
import Error from "../../Error";
import LoadingSmall from "../../LoadingSmall";

export default class ForgotPassword extends Component {
   state = {
      email: "",
      message: "",
      error: "",
      disable: false,
      loading: false,
   };

   handleChange = (e) => {
      this.setState({
         email: e.target.value,
         error: "",
      });
   };

   clickSubmit = (e) => {
      e.preventDefault();
      this.setState({ loading: true });
      forgotPassword(this.state.email).then((data) => {
         if (data.error) {
            this.setState({ error: data.error, loading: false });
         } else {
            this.setState({
               message: data.message,
               disable: true,
               loading: false,
            });
         }
      });
   };

   render() {
      const { email, message, error, disable, loading } = this.state;
      return (
         <div className="container">
            <h2 className="my-5">Ask for Password Reset</h2>
            {message && <Error message={message} alertColor="success" />}
            {error && <Error message={error} alertColor="danger" />}
            <form onSubmit={this.clickSubmit}>
               <div className="form-group">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Your email address"
                     onChange={this.handleChange}
                     value={email}
                     disabled={disable}
                  />
               </div>

               <div>
                  <button
                     disabled={disable}
                     type="submit"
                     className="btn btn-primary btn-raised mt-2"
                  >
                     Send Password Reset Link
                  </button>
                  {loading && (
                     <div className="float-right mt-2">
                        <LoadingSmall />
                     </div>
                  )}
               </div>
            </form>
         </div>
      );
   }
}
