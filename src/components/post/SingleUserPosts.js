import React, { Component } from "react";
import { read } from "../users/api";
import { singleUserPosts } from "./api";
import defaultPost from "../../images/post-default.webp";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { isAuthenticated } from "../users/auth";
import Loading from "../Loading";

export default class SingleUserPosts extends Component {
   state = {
      name: "",
      posts: [],
      page: 1,
      totalPage: [],
      loading: false,
      error: "",
   };

   loadPage = (page) => {
      const { token } = isAuthenticated();
      const posterId = this.props.match.params.posterId;
      read(posterId).then((data) => {
         if (data.error) {
            console.log(data.error);
            this.setState({ error: data.error, loading: false });
         } else {
            this.setState({ name: data.name });
         }
      });
      singleUserPosts(posterId, token, page).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            this.setState({
               posts: data.posts,
               totalPage: data.totalPage,
               loading: false,
            });
         }
      });
   };

   componentDidMount() {
      this.setState({ loading: true });
      this.loadPage(this.state.page);
   }

   //props update to change user profile
   componentDidUpdate(prevProps) {
      const prevUserId = prevProps.match.params.posterId;
      const newUserId = this.props.match.params.posterId;
      if (prevUserId !== newUserId) {
         this.loadPage(this.state.page);
      }
   }

   pageHandler = (pageNumber) => {
      let value = Number(pageNumber);
      if (pageNumber === "-1") {
         value = this.state.page - 1;
      }
      if (pageNumber === "+1") {
         value = this.state.page + 1;
      }
      this.setState({ page: value }, () => {
         this.loadPage(this.state.page);
      });
   };

   renderPosts = (posts, breakPoint) => (
      <div className="row">
         {posts.map((post, i) => {
            const postedUrl = post.postedBy ? `/user/${post.postedBy._id}` : "";
            const postedName = post.postedBy ? post.postedBy.name : "unknown";
            //post body handle
            let body = post.body.substring(0, 130);
            body = body.length === 130 ? `${body}...` : body;
            return (
               <div className={breakPoint} style={{ marginBottom: 30 }} key={i}>
                  <div className="card h-100">
                     <div className="card-body">
                        <img
                           src={`${process.env.REACT_APP_API_URL}/post/photo/${
                              post._id
                           }?${new Date().getTime()}`}
                           alt=".."
                           onError={(i) => (i.target.src = defaultPost)}
                           style={{
                              height: 200,
                              width: "auto",
                              minWidth: "100%",
                              objectFit: "cover",
                           }}
                           className="img-thumbnail mb-3"
                        />
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{body}</p>
                        <hr />
                        <div className="font-italic mark mb-2">
                           Posted By <Link to={postedUrl}>{postedName}</Link> On{" "}
                           {new Date(post.created).toDateString()}
                        </div>
                        <Link
                           to={`/post/${post._id}`}
                           className="btn btn-primary btn-raised btn-sm"
                        >
                           Read More
                        </Link>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );

   render() {
      const { posts, loading, name, error } = this.state;

      return (
         <div className="container">
            {error ? (
               <h2 className="my-5">User not found.</h2>
            ) : loading ? (
               <div className="text-center my-5">
                  <Loading />
               </div>
            ) : (
               <>
                  <h2 className="py-5">{name}'s Posts</h2>
                  {posts.length === 0 ? (
                     <h3>{!loading && "Empty."}</h3>
                  ) : (
                     <>
                        {this.renderPosts(posts, "col-lg-4 col-md-6")}
                        {loading ? (
                           ""
                        ) : (
                           <Pagination
                              pageHandler={this.pageHandler}
                              {...this.state}
                           />
                        )}
                     </>
                  )}
               </>
            )}
         </div>
      );
   }
}
