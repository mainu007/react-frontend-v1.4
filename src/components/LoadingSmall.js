import React from "react";

const spinner = [
   "spinner-border",
   "spinner-grow",
   "spinner-border",
   "spinner-grow",
   "spinner-border",
   "spinner-grow",
];

const LoadingSmall = () => {
   return (
      <div>
         {spinner.map((spinnerName, i) => (
            <div
               className={`text-primary mr-1 ${spinnerName} ${spinnerName}-sm`}
               role="status"
               key={i}
            >
               <span className="sr-only">Loading...</span>
            </div>
         ))}
      </div>
   );
};

export default LoadingSmall;
