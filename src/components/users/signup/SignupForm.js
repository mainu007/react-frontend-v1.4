import React from "react";
import LoadingSmall from "../../LoadingSmall";

const SignupForm = ({
   name,
   email,
   password,
   success,
   handleChange,
   clickSubmit,
   loading,
}) => {
   return (
      <form>
         <div className="form-group">
            <label className="text-muted">Name</label>
            <input
               disabled={success}
               onChange={handleChange("name")}
               type="text"
               className="form-control"
               value={name}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Email</label>
            <input
               disabled={success}
               onChange={handleChange("email")}
               type="email"
               className="form-control"
               value={email}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Password</label>
            <input
               disabled={success}
               onChange={handleChange("password")}
               type="password"
               className="form-control"
               value={password}
            />
         </div>
         <div>
            <button
               disabled={success}
               onClick={clickSubmit}
               type="submit"
               className="btn btn-primary btn-raised mt-2"
            >
               Submit
            </button>
            {loading && (
               <div className="float-right mt-2">
                  <LoadingSmall />
               </div>
            )}
         </div>
      </form>
   );
};

export default SignupForm;
