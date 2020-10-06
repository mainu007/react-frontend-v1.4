import React, { Component } from "react";
import { isAuthenticated } from "../users/auth";
import { comment, uncomment } from "./api";
import defaultProfile from "../../images/avatar.png";
import { Link } from "react-router-dom";
import Error from "../Error";
import { AiFillDelete } from "react-icons/ai";
import LoadingSmall from "../LoadingSmall";

export default class Comment extends Component {
   state = {
      text: "",
      error: "",
      loading: false,
   };

   handleChange = (e) => {
      this.setState({ text: e.target.value, error: "" });
   };

   clickSubmit = (e) => {
      e.preventDefault();
      this.setState({ loading: true });
      if (!isAuthenticated()) {
         this.setState({
            error: "Please signin!! Leave a comment",
            loading: false,
         });
         return false;
      }

      if (this.isValid()) {
         const userId = isAuthenticated().user._id;
         const token = isAuthenticated().token;
         const postId = this.props.postId;
         comment(userId, token, postId, { text: this.state.text }).then(
            (data) => {
               if (data.error) {
                  console.log(data.error);
                  this.setState({ loading: false });
               } else {
                  this.setState({ text: "", error: "", loading: false });
                  this.props.updateComment(data.comments);
               }
            }
         );
      }
   };

   isValid = () => {
      const { text } = this.state;
      if (!text.length > 0 || text.length > 150) {
         this.setState({
            error:
               "Comment should not be empty and less then 150 characters long",
            loading: false,
         });
         return false;
      }
      return true;
   };

   deleteConfirm = (comment) => {
      let answer = window.confirm("Are sure you want to delete your comment?");
      if (answer) {
         this.deleteComment(comment);
      }
   };

   deleteComment = (comment) => {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;
      uncomment(userId, token, postId, comment).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            this.props.updateComment(data.comments);
         }
      });
   };

   render() {
      const { loading } = this.state;
      const { comments } = this.props;
      return (
         <div className="mb-5">
            <h2 className="text-primary mt-5 mb-3">
               {comments.length} Comments
            </h2>
            <hr />

            {comments.reverse().map((comment, i) => (
               <div key={i}>
                  <Link to={`/user/${comment.postedBy._id}`}>
                     <img
                        className="float-left rounded-circle border-dark border mr-2"
                        style={{ width: 30, height: 30, objectFit: "cover" }}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                        onError={(i) => (i.target.src = defaultProfile)}
                        alt="..."
                     />
                  </Link>

                  <p className="lead">{comment.text}</p>
                  <div className="font-italic mark mb-4">
                     Posted By{" "}
                     <Link to={`/user/${comment.postedBy._id}`}>
                        {comment.postedBy.name}
                     </Link>
                     {` On ${new Date(
                        comment.created
                     ).toDateString()} ${new Date(
                        comment.created
                     ).toLocaleTimeString()}`}
                     {isAuthenticated() &&
                        isAuthenticated().user._id === comment.postedBy._id && (
                           <div
                              style={{ cursor: "pointer" }}
                              onClick={() => this.deleteConfirm(comment)}
                              className="text-danger float-right mouse-pointer"
                           >
                              Remove{" "}
                              <span className="align-middle">
                                 <AiFillDelete />
                              </span>
                           </div>
                        )}
                  </div>
               </div>
            ))}

            <h2 className="my-3">Leave a Comment</h2>

            <Error message={this.state.error} alertColor="danger" />

            <form onSubmit={this.clickSubmit}>
               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     onChange={this.handleChange}
                     value={this.state.text}
                     placeholder="Leave a comment.."
                  />
                  <div>
                     <button className="btn btn-raised btn-success mt-2">
                        Post
                     </button>
                     {loading && (
                        <div className="float-right mt-2">
                           <LoadingSmall />
                        </div>
                     )}
                  </div>
               </div>
            </form>
         </div>
      );
   }
}
