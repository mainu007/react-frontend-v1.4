import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../users";

export default class Admin extends Component {
   render() {
      return (
         <div>
            <div className="bg-light p-5 text-center">
               <h2>Admin Dashboard</h2>
               <p className="lead">Welcome to React Frontend</p>
            </div>
            <div className="container-fluid">
               <div className="row">
                  <div className="col-lg-6">
                     <h2>Posts</h2>
                     <hr />

                     <Posts breakPoint="col-md-4 col-sm-6 col-lg-6 col-xl-4" />
                  </div>
                  <div className="col-lg-6">
                     <h2>Users</h2>
                     <hr />

                     <Users breakPoint="col-md-4 col-sm-6 col-lg-6 col-xl-4" />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
