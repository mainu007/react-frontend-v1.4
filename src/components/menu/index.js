import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../users/auth";
import defaultProfile from "../../images/avatar.png";
import { GoHome } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

const isActive = (history, path) => {
   const {
      location: { pathname },
   } = history;
   if (pathname === path) return "active";
   else return "";
};

const signoutConfirm = (next) => {
   const answer = window.confirm("You are sure Signin Out?");
   if (answer) {
      signout(next);
   }
};

const photoLoad = (userId) => {
   return userId
      ? `${
           process.env.REACT_APP_API_URL
        }/user/photo/${userId}?${new Date().getTime()}`
      : defaultProfile;
};

const Menu = ({ history }) => {
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container-fluid">
            <Link to="/" className="navbar-brand">
               <GoHome />
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <FiMenu />
            </button>

            <div
               className="collapse navbar-collapse"
               id="navbarSupportedContent"
            >
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                     <Link
                        className={`nav-link ${isActive(history, "/users")}`}
                        to="/users"
                     >
                        Users
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        className={`nav-link ${isActive(
                           history,
                           "/findpeople"
                        )}`}
                        to="/findpeople"
                     >
                        Find People
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        to="/post/create"
                        className={`nav-link ${isActive(
                           history,
                           "/post/create"
                        )}`}
                     >
                        Create Post
                     </Link>
                  </li>
               </ul>

               <div className="navbar-nav">
                  {!isAuthenticated() && (
                     <>
                        <li className="nav-item">
                           <Link
                              className={`nav-link ${isActive(
                                 history,
                                 "/signin"
                              )}`}
                              to="/signin"
                           >
                              Sign In
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link
                              className={`nav-link ${isActive(
                                 history,
                                 "/signup"
                              )}`}
                              to="/signup"
                           >
                              Sign Up
                           </Link>
                        </li>
                     </>
                  )}
                  {isAuthenticated() && (
                     <>
                        <li
                           className={`nav-item dropdown py-0 ${isActive(
                              history,
                              `/user/${isAuthenticated().user._id}`
                           )}`}
                        >
                           <button
                              type="button"
                              className={`btn nav-link btn-primary btn-rounded dropdown-toggle dropdown-toggle-split py-1 mb-0 w-100`}
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                           >
                              <img
                                 className="mr-2"
                                 src={photoLoad(isAuthenticated().user._id)}
                                 onError={(i) =>
                                    (i.target.src = defaultProfile)
                                 }
                                 alt="..."
                                 style={{
                                    height: 30,
                                    width: 30,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                 }}
                              />

                              <span className="mr-1">
                                 {isAuthenticated().user.name}
                              </span>
                              <span className="sr-only">Toggle Dropright</span>
                           </button>
                           <div className="dropdown-menu dropdown-menu-right">
                              <Link
                                 className={`dropdown-item`}
                                 to={`/user/${isAuthenticated().user._id}`}
                              >
                                 My Profile
                              </Link>
                              <Link
                                 className={`dropdown-item`}
                                 to={`/user/edit/${isAuthenticated().user._id}`}
                              >
                                 Edit Profile
                              </Link>
                              <Link
                                 to={`/posts/by/${isAuthenticated().user._id}`}
                                 className={`dropdown-item`}
                              >
                                 My Posts
                              </Link>
                              {isAuthenticated() &&
                                 isAuthenticated().user.role === "admin" && (
                                    <Link
                                       to="/admin"
                                       className={`dropdown-item`}
                                    >
                                       Dashboard
                                    </Link>
                                 )}
                              <div className="dropdown-divider"></div>
                              <span
                                 className={`dropdown-item`}
                                 onClick={() =>
                                    signoutConfirm(() => history.push("/"))
                                 }
                              >
                                 Sign Out
                              </span>
                           </div>
                        </li>
                     </>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default withRouter(Menu);
