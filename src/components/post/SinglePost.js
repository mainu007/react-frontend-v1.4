import React, { Component } from "react";
import { remove, singlePost, like, unlike } from "./api";
import Loading from "../Loading";
import defaultPost from "../../images/post-default.webp";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../users/auth";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Comment from "./Comment";

export default class SinglePost extends Component {
   state = {
      post: "",
      loading: true,
      redirectToSignin: false,
      like: false,
      likes: 0,
      comments: [],
      error: "",
   };

   checkLike = (likes) => {
      const userId = isAuthenticated() && isAuthenticated().user._id;
      const match = likes.indexOf(userId) !== -1;
      return match;
   };

   clickLike = () => {
      if (isAuthenticated()) {
         let callApi = this.state.like ? unlike : like;
         const userId = isAuthenticated().user._id;
         const token = isAuthenticated().token;
         const postId = this.state.post._id;
         callApi(userId, token, postId).then((data) => {
            if (data.error) {
               console.log(data.error);
            } else {
               this.setState({
                  like: !this.state.like,
                  likes: data.likes.length,
               });
            }
         });
      } else {
         this.setState({ redirectToSignin: true });
      }
   };

   updateComment = (comments) => {
      this.setState({ comments });
   };

   componentDidMount() {
      const postId = this.props.match.params.postId;
      singlePost(postId).then((data) => {
         if (data.error) {
            console.log(data.error);
            this.setState({ loading: false, error: data.error });
         } else {
            this.setState({
               post: data,
               loading: false,
               likes: data.likes.length,
               like: this.checkLike(data.likes),
               comments: data.comments,
            });
         }
      });
   }

   deleteConfirm = () => {
      let answer = window.confirm("You are sure delete your Post?");
      if (answer) {
         this.deletePost();
      }
   };

   deletePost = () => {
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;
      remove(postId, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            this.props.history.goBack();
         }
      });
   };

   renderPost = (post) => {
      const { likes, like } = this.state;
      const postedUrl = post.postedBy ? `/user/${post.postedBy._id}` : "";
      const postedName = post.postedBy ? post.postedBy.name : "unknown";
      return (
         <div className="card-body p-0">
            <img
               src={`${process.env.REACT_APP_API_URL}/post/photo/${
                  post._id
               }?${new Date().getTime()}`}
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
            <h3>
               <span
                  className="text-info"
                  style={{ verticalAlign: "middle", cursor: "pointer" }}
                  onClick={this.clickLike}
               >
                  {like ? <AiFillLike /> : <AiOutlineLike />}
               </span>
               {` ${likes} Like`}
            </h3>
            <p className="card-text">{post.body}</p>
            <hr />
            <div className="font-italic mark my-4">
               Posted By <Link to={postedUrl}>{postedName}</Link> On{" "}
               {new Date(post.created).toDateString()}
            </div>
            <div className="d-inline-block">
               <button
                  onClick={() => this.props.history.goBack()}
                  className="btn btn-primary btn-raised mr-4"
               >
                  Back To Post
               </button>
               {isAuthenticated() &&
                  isAuthenticated().user._id === post.postedBy._id && (
                     <>
                        <Link
                           to={`/post/edit/${post._id}`}
                           className="btn btn-info btn-raised mr-4"
                        >
                           Update Post
                        </Link>
                        <button
                           onClick={this.deleteConfirm}
                           className="btn btn-danger btn-raised"
                        >
                           Delete Post
                        </button>
                     </>
                  )}
            </div>
            {isAuthenticated() &&
               isAuthenticated().user.role === "admin" &&
               post.postedBy._id !== isAuthenticated().user._id && (
                  <div>
                     <div className="card mt-5">
                        <div className="card-body">
                           <h5 className="card-title">Admin</h5>
                           <p className="mb-2 text-danger">
                              Edit/Delete as an Admin
                           </p>
                           <Link
                              to={`/post/edit/${post._id}`}
                              className="btn btn-info btn-raised mr-4"
                           >
                              Update Post
                           </Link>
                           <button
                              onClick={this.deleteConfirm}
                              className="btn btn-danger btn-raised"
                           >
                              Delete Post
                           </button>
                        </div>
                     </div>
                  </div>
               )}
         </div>
      );
   };

   render() {
      const { post, loading, redirectToSignin, comments, error } = this.state;

      if (redirectToSignin) {
         return <Redirect to="/signin" />;
      }
      return (
         <div className="container">
            {loading ? (
               <div className="text-center my-5">
                  <Loading />
               </div>
            ) : (
               <>
                  {error ? (
                     <h3 className="my-5 display-2">{error}</h3>
                  ) : (
                     <>
                        <h2 className="display-2 my-5">{post.title}</h2>
                        {this.renderPost(post)}
                        <Comment
                           postId={post._id}
                           comments={comments}
                           updateComment={this.updateComment}
                        />
                     </>
                  )}
               </>
            )}
         </div>
      );
   }
}
