import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { update } from "./api";
import { isAuthenticated } from "../users/auth";
import { singlePost } from "./api";
import PostForm from "./PostForm";
import defaultPost from "../../images/post-default.webp";
import Error from "../Error";
import Loading from "../Loading";

export default class EditPost extends Component {
   state = {
      id: "",
      title: "",
      body: "",
      photo: "",
      fileSize: 0,
      redirectToPost: false,
      error: "",
      loading: false,
      formLoading: false,
   };

   init = () => {
      const postId = this.props.match.params.postId;
      singlePost(postId).then((data) => {
         if (data.error) {
            console.log(data.error);
            this.setState({ redirectToPost: true });
         } else {
            const { _id, title, body } = data;
            this.setState({ id: _id, title, body, loading: false });
         }
      });
   };

   componentDidMount() {
      this.setState({ loading: true });
      this.postData = new FormData();
      this.init();
   }

   handleChange = (name) => (event) => {
      this.setState({ error: "" });
      const value =
         name === "photo" ? event.target.files[0] : event.target.value;
      if (name === "photo" && event.target.files[0] !== undefined) {
         const fileSize = event.target.files[0].size;
         this.setState({ fileSize });
      } else {
         this.setState({
            [name]: value,
         });
      }

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
      this.setState({ formLoading: true });
      if (this.isValid()) {
         const postId = this.props.match.params.postId;
         const token = isAuthenticated().token;
         console.log("EditPost -> clickPost -> token", token);
         update(postId, token, this.postData).then((data) => {
            if (data.error) {
               this.setState({ error: data.error });
            } else {
               this.setState({ formLoading: false, redirectToPost: true });
            }
         });
      }
   };

   render() {
      const {
         id,
         title,
         body,
         loading,
         redirectToPost,
         error,
         formLoading,
      } = this.state;
      if (redirectToPost) {
         return <Redirect to={`/post/${id}`} />;
      }
      return (
         <div className="container mb-5">
            {loading ? (
               <div className="my-5 text-center">
                  <Loading />
               </div>
            ) : (
               <h2 className="my-5">{title}</h2>
            )}

            <img
               src={`${
                  process.env.REACT_APP_API_URL
               }/post/photo/${id}?${new Date().getTime()}`}
               alt=".."
               onError={(i) => (i.target.src = defaultPost)}
               style={{
                  height: 350,
                  width: "auto",
                  minWidth: "100%",
                  objectFit: "cover",
               }}
               className="img-thumbnail mb-3"
            />
            <Error message={error} alertColor="danger" />
            <PostForm
               title={title}
               body={body}
               handleChange={this.handleChange}
               clickPost={this.clickPost}
               formLoading={formLoading}
            />
         </div>
      );
   }
}
