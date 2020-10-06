import React from "react";

const spinner = [
   "spinner-border",
   "spinner-grow",
   "spinner-border",
   "spinner-grow",
   "spinner-border",
   "spinner-grow",
   "spinner-border",
   "spinner-grow",
   "spinner-border",
];

const Loading = () => {
   return (
      <div>
         {spinner.map((spinnerName, i) => (
            <div
               className={`text-primary mr-2 ${spinnerName}`}
               role="status"
               key={i}
            >
               <span className="sr-only">Loading...</span>
            </div>
         ))}
      </div>
   );
};

export default Loading;
