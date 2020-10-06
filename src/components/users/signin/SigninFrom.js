import React from "react";
import { Link } from "react-router-dom";
import LoadingSmall from "../../LoadingSmall";
import SocialLogin from "./SocialLogin";

const SignInForm = ({
   email,
   password,
   handleChange,
   clickSubmit,
   loading,
   loadingUpdate,
   reCaptcha1,
   reCaptcha2,
   reCaptchaAnswer,
}) => {
   return (
      <form>
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
            <label className="text-dark">{`${reCaptcha1} + ${reCaptcha2}`}</label>
            <input
               onChange={handleChange("reCaptchaAnswer")}
               type="text"
               className="form-control"
               value={reCaptchaAnswer}
            />
         </div>
         <button
            onClick={clickSubmit}
            type="submit"
            className="btn btn-primary btn-raised mt-2"
         >
            Login
         </button>

         {loading && (
            <div className=" float-right pt-2">
               <LoadingSmall />
            </div>
         )}

         <div className="mt-5">
            <SocialLogin loadingUpdate={loadingUpdate} />
         </div>

         <div>
            <Link
               to="/forgot-password"
               className="btn btn-warning btn-raised mt-3"
            >
               Forgot Password
            </Link>
         </div>
      </form>
   );
};

export default SignInForm;
