import React, { Component } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../api";
import Error from "../../Error";
import LoadingSmall from "../../LoadingSmall";

export default class ResetPassword extends Component {
   state = {
      newPassword: "",
      message: "",
      error: "",
      disable: false,
      loading: false,
   };

   handleChange = (e) => {
      this.setState({
         newPassword: e.target.value,
         error: "",
      });
   };

   clickSubmit = (e) => {
      e.preventDefault();
      this.setState({ loading: true });
      const { newPassword } = this.state;
      const resetPasswordToken = this.props.match.params.resetPasswordToken;
      resetPassword(resetPasswordToken, newPassword).then((data) => {
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
      const { message, error, disable, loading } = this.state;
      return (
         <div className="container">
            <h2 className="my-5">Reset your Password</h2>

            {message && (
               <div className={`alert alert-success`}>
                  Great! Now you can <Link to="/signin">Login</Link> with your
                  new password.
               </div>
            )}
            {error && <Error message={error} alertColor="danger" />}
            <form onSubmit={this.clickSubmit}>
               <div className="form-group">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="New password"
                     onChange={this.handleChange}
                     disabled={disable}
                  />
               </div>

               <div>
                  <button
                     disabled={disable}
                     type="submit"
                     className="btn btn-primary btn-raised mt-2"
                  >
                     Reset Password
                  </button>
                  {loading && (
                     <div className="mt-2 float-right">
                        <LoadingSmall />
                     </div>
                  )}
               </div>
            </form>
         </div>
      );
   }
}
