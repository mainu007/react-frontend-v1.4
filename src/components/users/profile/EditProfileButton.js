import React from "react";
import DeleteUser from "../DeleteUser";
import { Link } from "react-router-dom";

const EditProfileButton = ({ id }) => {
   return (
      <div className="d-inline-block">
         <Link
            to={`/user/edit/${id}`}
            className="btn btn-raised btn-success mr-4"
         >
            Edit Profile
         </Link>
         <DeleteUser userId={id} />
      </div>
   );
};

export default EditProfileButton;
