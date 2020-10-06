import React from "react";
import LoadingSmall from "../../LoadingSmall";

const UpdateForm = ({
   name,
   email,
   handleChange,
   clickUpdate,
   password,
   about,
   submitLoading,
}) => {
   return (
      <form>
         <div className="form-group">
            <label className="text-muted">Profile Photo</label>
            <input
               onChange={handleChange("photo")}
               type="file"
               accept="image/*"
               className="form-control"
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Name</label>
            <input
               onChange={handleChange("name")}
               type="text"
               className="form-control"
               value={name}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Email</label>
            <input
               onChange={handleChange("email")}
               type="email"
               className="form-control"
               value={email}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Password</label>
            <input
               onChange={handleChange("password")}
               type="password"
               className="form-control"
               value={password}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">About</label>
            <textarea
               onChange={handleChange("about")}
               type="text"
               className="form-control"
               value={about}
               rows="5"
            />
         </div>
         <button
            onClick={clickUpdate}
            type="submit"
            className="btn btn-primary btn-raised mt-2"
         >
            Update
         </button>
         {submitLoading && (
            <div className="float-right mt-2">
               <LoadingSmall />
            </div>
         )}
      </form>
   );
};

export default UpdateForm;
