import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { read, update, updateUser } from "../api";
import { isAuthenticated } from "../auth";
import UpdateForm from "./UpdateForm";
import Error from "../../Error";
import Loading from "../../Loading";
import defaultProfile from "../../../images/avatar.png";

export default class EditProfile extends Component {
   state = {
      id: "",
      name: "",
      email: "",
      about: "",
      password: "",
      fileSize: 0,
      redirectToProfile: false,
      error: "",
      loading: false,
      submitLoading: false,
   };

   init = (userId) => {
      const { token } = isAuthenticated();
      read(userId, token).then((data) => {
         if (data.error) {
            this.setState({ redirectToProfile: true });
         } else {
            const { _id, name, email, about } = data;
            this.setState({ id: _id, name, email, about }, () => {
               this.setState({ loading: false });
            });
         }
      });
   };

   componentDidMount() {
      this.setState({ loading: true });
      this.userData = new FormData();
      const userId = this.props.match.params.userId;
      this.init(userId);
   }

   handleChange = (name) => (event) => {
      this.setState({ error: "" });
      const value =
         name === "photo" ? event.target.files[0] : event.target.value;
      if (name === "photo") {
         const fileSize = event.target.files[0].size;
         this.setState({ fileSize });
      }
      this.setState({
         [name]: value,
      });
      this.userData.set(name, value);
   };

   //client side form validation
   isValid = () => {
      const { name, email, password, fileSize } = this.state;
      const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (fileSize > 200000) {
         this.setState({
            submitLoading: false,
            error: "File size should be less then 200KB",
            loading: false,
         });
         return false;
      }
      if (name.length === 0) {
         this.setState({
            submitLoading: false,
            error: "Name is require",
            loading: false,
         });
         return false;
      }
      if (!emailCheck.test(email)) {
         this.setState({
            submitLoading: false,
            error: "A valid Email is require",
            loading: false,
         });
         return false;
      }
      if (password.length === 0) {
         return true;
      }
      if (!passwordCheck.test(password)) {
         this.setState({
            submitLoading: false,
            error:
               "Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
            loading: false,
         });
         return false;
      }
      return true;
   };

   clickUpdate = (event) => {
      event.preventDefault();
      this.setState({ submitLoading: true });
      if (this.isValid()) {
         const { token } = isAuthenticated();
         const userId = this.props.match.params.userId;
         update(userId, token, this.userData).then((data) => {
            if (data.error) {
               this.setState({ submitLoading: false, error: data.error });
            } else {
               updateUser(data, () => {
                  this.setState({ redirectToProfile: true });
               });
            }
         });
      }
   };

   render() {
      const { id, redirectToProfile, error, loading } = this.state;
      const photoUrl = id
         ? `${
              process.env.REACT_APP_API_URL
           }/user/photo/${id}?${new Date().getTime()}`
         : defaultProfile;
      if (redirectToProfile) {
         return <Redirect to={`/user/${id}`} />;
      }
      return (
         <div className="container mb-5">
            <h2 className="my-5">Edit Profile</h2>

            {loading ? (
               <Loading />
            ) : (
               <>
                  <img
                     style={{
                        height: 200,
                        minWidth: 250,
                        width: "auto",
                        objectFit: "cover",
                     }}
                     className="img-thumbnail"
                     src={photoUrl}
                     onError={(i) => (i.target.src = defaultProfile)}
                     alt="..."
                  />

                  <Error message={error} alertColor="danger" />
                  <UpdateForm
                     handleChange={this.handleChange}
                     clickUpdate={this.clickUpdate}
                     {...this.state}
                  />
               </>
            )}
         </div>
      );
   }
}
