import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Loading from "../../Loading";
import { read } from "../api";
import defaultProfile from "../../../images/avatar.png";
import FollowProfileButton from "./FollowProfileButton";
import EditProfileButton from "./EditProfileButton";
import ProfileTabs from "./ProfileTabs";
import { postsByUser } from "../../post/api";

export default class Profile extends Component {
   state = {
      user: { following: [], followers: [] },
      following: false,
      loading: false,
      posts: [],
      redirectToSignin: false,
      error: "",
      clickLoading: false,
   };

   //click follow
   clickFollowButton = (callApi) => {
      this.setState({ clickLoading: true });
      if (isAuthenticated()) {
         const {
            token,
            user: { _id: userId },
         } = isAuthenticated();
         const { _id: followId } = this.state.user;
         callApi(userId, token, followId).then((data) => {
            if (data.error) {
               console.log(data.error);
               this.setState({ clickLoading: false });
            } else {
               this.setState({
                  user: data,
                  following: !this.state.following,
                  clickLoading: false,
               });
            }
         });
      } else {
         this.setState({ redirectToSignin: true });
      }
   };

   //check follow
   checkFollow = (user) => {
      const jwt = isAuthenticated();
      const match = user.followers.find((follower) => {
         return follower._id === jwt.user._id;
      });
      return match;
   };

   init = (userId) => {
      // const { token } = isAuthenticated();
      read(userId).then((data) => {
         if (data.error) {
            console.log(data.error);
            this.setState({ loading: false, error: data.error });
         } else {
            if (isAuthenticated()) {
               const following = this.checkFollow(data);
               this.setState({ following });
            }
            this.setState({
               user: data,
               loading: false,
            });
         }
      });
   };

   loadPosts = (userId) => {
      const { token } = isAuthenticated();
      postsByUser(userId, token).then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            this.setState({ posts: data });
         }
      });
   };

   componentDidMount() {
      this.setState({ loading: true });
      const userId = this.props.match.params.userId;
      this.init(userId);
      this.loadPosts(userId);
   }

   //props update to change user profile
   componentDidUpdate(prevProps) {
      const prevUserId = prevProps.match.params.userId;
      const newUserId = this.props.match.params.userId;
      if (prevUserId !== newUserId) {
         this.init(newUserId);
      }
   }

   photoLoad = (userId) => {
      return userId
         ? `${
              process.env.REACT_APP_API_URL
           }/user/photo/${userId}?${new Date().getTime()}`
         : defaultProfile;
   };

   userInfo = ({ _id, name, email, created }) => {
      return (
         <div className="lead">
            <p>
               {isAuthenticated() && _id === isAuthenticated().user._id
                  ? `Hello ${name}`
                  : name}
            </p>
            <p>{`Email: ${email}`}</p>
            <p>{`Joined ${new Date(created).toDateString()}`}</p>
         </div>
      );
   };

   renderUser = (user, following) => (
      <>
         <div className="row mb-4">
            <div className=" col-lg-4">
               <img
                  className="card-img-top img-thumbnail"
                  src={this.photoLoad(user._id)}
                  onError={(i) => (i.target.src = defaultProfile)}
                  alt="..."
                  style={{
                     height: 200,
                     minWidth: 250,
                     width: "auto",
                     objectFit: "cover",
                  }}
               />
            </div>
            <div className=" col-lg-8 mt-4 mt-lg-0">
               {user._id && this.userInfo(user)}
               {isAuthenticated() &&
               user._id &&
               user._id === isAuthenticated().user._id ? (
                  <>
                     <Link
                        to="/post/create"
                        className="btn btn-raised btn-info mr-4 mb-3 mb-sm-0"
                     >
                        Create Post
                     </Link>
                     <EditProfileButton id={user._id} />
                  </>
               ) : (
                  <FollowProfileButton
                     onButtonClick={this.clickFollowButton}
                     following={following}
                     clickLoading={this.state.clickLoading}
                  />
               )}
               {isAuthenticated() &&
                  isAuthenticated().user.role === "admin" &&
                  user._id !== isAuthenticated().user._id && (
                     <div>
                        <div className="card mt-5">
                           <div className="card-body">
                              <h5 className="card-title">Admin</h5>
                              <p className="mb-2 text-danger">
                                 Edit/Delete as an Admin
                              </p>
                              <EditProfileButton id={user._id} />
                           </div>
                        </div>
                     </div>
                  )}
            </div>
         </div>

         <div className="row">
            {user.about && (
               <div className="col-md-12">
                  <hr />
                  <p className="lead">{user.about}</p>
                  <hr />
               </div>
            )}
         </div>
      </>
   );

   render() {
      const {
         user,
         posts,
         following,
         loading,
         redirectToSignin,
         error,
      } = this.state;
      if (redirectToSignin) {
         return <Redirect to="/signin" />;
      }
      return (
         <div className="container">
            <h2 className="my-5">Profile</h2>
            {loading ? (
               <Loading />
            ) : (
               <>
                  {error ? (
                     <h3>{error}</h3>
                  ) : (
                     <>
                        {this.renderUser(user, following)}
                        <ProfileTabs
                           following={user.following}
                           followers={user.followers}
                           posts={posts}
                           userId={user._id}
                        />
                     </>
                  )}
               </>
            )}
         </div>
      );
   }
}
