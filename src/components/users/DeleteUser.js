import React, { Component } from "react";
import { isAuthenticated, signout } from "./auth";
import { remove } from "./api";
import { withRouter } from "react-router-dom";

class DeleteUser extends Component {
   deleteAccount = () => {
      const { token } = isAuthenticated();
      const { userId } = this.props;
      remove(userId, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            //signout
            signout(() => console.log("Account Deleted"));
            //redirect
            this.props.history.goBack();
         }
      });
   };

   deleteConfirm = () => {
      let answer = window.confirm("You are sure delete your Account?");
      if (answer) {
         this.deleteAccount();
      }
   };

   render() {
      return (
         <button
            onClick={this.deleteConfirm}
            className="btn btn-raised btn-danger"
         >
            Delete Profile
         </button>
      );
   }
}

export default withRouter(DeleteUser);
