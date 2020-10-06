import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../../images/avatar.png";

const ProfileTabs = ({ following, followers, posts, userId }) => {
   return (
      <div className="row">
         <div className="col-md-4">
            <hr />
            <h3 className="text-primary">Followers</h3>
            <hr />

            {followers.map((person, i) => (
               <div key={i}>
                  <Link to={`/user/${person._id}`}>
                     <img
                        className="float-left rounded-circle border-dark border mr-2"
                        style={{ width: 30, height: 30, objectFit: "cover" }}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        onError={(i) => (i.target.src = defaultProfile)}
                        alt="..."
                     />

                     <p className="lead">{person.name}</p>
                  </Link>
               </div>
            ))}
         </div>

         <div className="col-md-4">
            <hr />
            <h3 className="text-primary">Following</h3>
            <hr />
            {following.map((person, i) => (
               <div key={i}>
                  <Link to={`/user/${person._id}`}>
                     <img
                        className="float-left rounded-circle border-dark border mr-2"
                        style={{ width: 30, height: 30, objectFit: "cover" }}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        onError={(i) => (i.target.src = defaultProfile)}
                        alt="..."
                     />

                     <p className="lead">{person.name}</p>
                  </Link>
               </div>
            ))}
         </div>

         <div className="col-md-4">
            <hr />
            <h3
               className="text-primary"
               style={{ display: "flex", justifyContent: "space-between" }}
            >
               Posts
               <Link
                  className="float-right"
                  style={{ fontSize: 16, alignSelf: "flex-end" }}
                  to={`/posts/by/${userId}`}
               >
                  Show Details
               </Link>
            </h3>
            <hr />
            {posts.map((post, i) => (
               <div key={i}>
                  <Link to={`/post/${post._id}`}>
                     <p className="lead">{post.title}</p>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ProfileTabs;
