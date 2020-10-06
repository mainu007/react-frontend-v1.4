import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { create } from "./api";
import { isAuthenticated } from "../users/auth";
import Error from "../Error";
import PostForm from "./PostForm";

export default class NewPost extends Component {
   state = {
      title: "",
      body: "",
      photo: "",
      user: {},
      fileSize: 0,
      redirectToProfile: false,
      error: "",
      loading: false,
   };

   componentDidMount() {
      this.postData = new FormData();
      this.setState({ user: isAuthenticated().user });
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
      this.postData.set(name, value);
   };

   //client side form validation
   isValid = () => {
      const { title, body, fileSize } = this.state;
      if (fileSize > 200000) {
         this.setState({
            error: "File size should be less then 200KB",
            loading: false,
         });
         return false;
      }
      if (title.length === 0 || body.length === 0) {
         this.setState({ error: "All fields is require", loading: false });
         return false;
      }
      return true;
   };

   clickPost = (event) => {
      event.preventDefault();
      this.setState({ loading: true });
      if (this.isValid()) {
         const userId = isAuthenticated().user._id;
         const token = isAuthenticated().token;
         create(userId, token, this.postData).then((data) => {
            if (data.error) {
               this.setState({ error: data.error });
            } else {
               this.setState({ loading: false, redirectToProfile: true });
            }
         });
      }
   };

   render() {
      const { error, redirectToProfile } = this.state;

      if (redirectToProfile) {
         return <Redirect to={`/`} />;
      }
      return (
         <div className="container">
            <h2 className="my-5">Create Post</h2>

            <Error message={error} alertColor="danger" />

            <PostForm
               handleChange={this.handleChange}
               clickPost={this.clickPost}
               {...this.state}
               formLoading={this.state.loading}
            />
         </div>
      );
   }
}
