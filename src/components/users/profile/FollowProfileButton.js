import React from "react";
import { follow, unFollow } from "../api";

const FollowProfileButton = ({ following, onButtonClick, clickLoading }) => {
   const clickFollow = () => {
      onButtonClick(follow);
   };
   const clickUnFollow = () => {
      onButtonClick(unFollow);
   };
   return (
      <div className="d-inline-block">
         {!following ? (
            <button
               onClick={clickFollow}
               className="btn btn-success btn-raised mr-4"
            >
               {clickLoading ? (
                  <div
                     class="spinner-border spinner-border-sm text-light"
                     role="status"
                  >
                     <span class="sr-only">Loading...</span>
                  </div>
               ) : (
                  "Follow"
               )}
            </button>
         ) : (
            <button
               onClick={clickUnFollow}
               className="btn btn-warning btn-raised mr-4"
            >
               {clickLoading ? (
                  <div
                     class="spinner-border spinner-border-sm text-light"
                     role="status"
                  >
                     <span class="sr-only">Loading...</span>
                  </div>
               ) : (
                  "UnFollow"
               )}
            </button>
         )}
      </div>
   );
};

export default FollowProfileButton;
