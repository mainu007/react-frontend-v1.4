import React from "react";
import Posts from "../post/Posts";

const Home = () => {
   return (
      <>
         <div className="bg-light p-5 text-center">
            <div className="container-fluid">
               <h2>Home</h2>
               <p className="lead">Welcome to React Home</p>
            </div>
         </div>
         <div className="container mb-5">
            <h2 className="my-5">Recent Posts</h2>
            <Posts breakPoint="col-lg-4 col-md-6" />
         </div>
      </>
   );
};

export default Home;
