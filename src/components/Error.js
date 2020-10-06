import React from "react";

const Error = ({ message, alertColor }) => {
   return (
      <div
         className={`alert alert-${alertColor}`}
         style={{ display: message ? "" : "none" }}
      >
         {message}
      </div>
   );
};

export default Error;
