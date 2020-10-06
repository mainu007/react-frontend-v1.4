import React, { Component } from "react";
import { findPeople, follow } from "../api";
import { isAuthenticated } from "../auth";
import defaultProfile from "../../../images/avatar.png";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import Loading from "../../Loading";

export default class FindPeople extends Component {
   state = {
      users: [],
      loading: true,
      page: 1,
      totalPage: [],
      followMessage: "",
      open: false,
      clickLoading: { loading: false, index: null },
   };

   loadPage = (page) => {
      const { token } = isAuthenticated();
      const userId = isAuthenticated().user._id;
      findPeople(userId, token, page).then((data) => {
         if (data.error) {
            console.log(data.error);
            this.setState({ loading: false });
         } else {
            this.setState({
               users: data.users,
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

   onFollowButton = (user, i) => {
      this.setState({ clickLoading: { loading: true, index: i } });
      const {
         token,
         user: { _id: userId },
      } = isAuthenticated();
      follow(userId, token, user._id).then((data) => {
         if (data.error) {
            this.setState({
               error: data.error,
               clickLoading: { loading: false, index: null },
            });
         } else {
            let toFollow = this.state.users;
            toFollow.splice(i, 1);
            this.loadPage(this.state.page);
            this.setState({
               users: toFollow,
               open: true,
               followMessage: `Following ${user.name}`,
               clickLoading: { loading: false, index: null },
            });
         }
      });
   };

   renderUsers = (users, clickLoading) => (
      <div className="row">
         {users.length > 0 &&
            users.map((user, i) => {
               const photoUrl = user._id
                  ? `${process.env.REACT_APP_API_URL}/user/photo/${
                       user._id
                    }?${new Date().getTime()}`
                  : defaultProfile;
               return (
                  <div
                     className="col-lg-4 col-md-6"
                     style={{ marginBottom: 30 }}
                     key={i}
                  >
                     <div className="card">
                        <img
                           className="card-img-top"
                           src={photoUrl}
                           onError={(i) => (i.target.src = defaultProfile)}
                           alt="..."
                           style={{
                              height: 200,
                              width: "auto",
                              objectFit: "cover",
                           }}
                        />
                        <div className="card-body">
                           <h5 className="card-title">{user.name}</h5>
                           <Link
                              to={`/user/${user._id}`}
                              className="btn btn-primary btn-raised btn-sm"
                           >
                              View Profile
                           </Link>

                           <button
                              onClick={() => this.onFollowButton(user, i)}
                              className="btn btn-info btn-raised btn-sm float-right"
                           >
                              {clickLoading.loading === true &&
                              clickLoading.index === i ? (
                                 <div
                                    class="spinner-border spinner-border-sm text-light"
                                    role="status"
                                 >
                                    <span class="sr-only">Loading...</span>
                                 </div>
                              ) : (
                                 "follow"
                              )}
                           </button>
                        </div>
                     </div>
                  </div>
               );
            })}
      </div>
   );

   render() {
      const { users, loading, open, followMessage, clickLoading } = this.state;

      return (
         <div className="container">
            <h2 className="my-5">Find Friends</h2>
            {loading && <Loading />}
            {open && <div className="alert alert-success">{followMessage}</div>}
            {this.renderUsers(users, clickLoading)}
            {!loading && (
               <Pagination pageHandler={this.pageHandler} {...this.state} />
            )}
         </div>
      );
   }
}
