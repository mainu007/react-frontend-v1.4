import React, { Component } from "react";
import { list } from "./api";
import defaultProfile from "../../images/avatar.png";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Loading from "../Loading";

export default class Users extends Component {
   state = {
      users: [],
      loading: true,
      page: 1,
      totalPage: [],
   };

   loadPage = (page) => {
      list(page).then((data) => {
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

   renderUsers = (users, breakPoint) => (
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
                     className={breakPoint}
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
                           <p className="card-text">{user.email}</p>
                           <Link
                              to={`/user/${user._id}`}
                              className="btn btn-primary btn-raised btn-sm"
                           >
                              View Profile
                           </Link>
                        </div>
                     </div>
                  </div>
               );
            })}
      </div>
   );

   render() {
      const { users, loading } = this.state;

      return (
         <>
            {loading && <Loading />}
            {this.renderUsers(users, this.props.breakPoint)}

            {!loading && (
               <Pagination pageHandler={this.pageHandler} {...this.state} />
            )}
         </>
      );
   }
}
export const UsersContainer = () => {
   return (
      <div className="container">
         <h2 className="my-5">All Users</h2>
         <Users breakPoint="col-lg-4 col-md-6" />
      </div>
   );
};
