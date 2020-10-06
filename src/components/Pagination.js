import React from "react";

const Pagination = ({ pageHandler, page, totalPage }) => {
   return (
      <nav aria-label="..." className="mb-5">
         <ul className="pagination">
            <li className={`page-item ${page > 1 ? "" : "disabled"}`}>
               <span className="page-link" onClick={() => pageHandler("-1")}>
                  Previous
               </span>
            </li>

            {totalPage.map((number) => {
               return (
                  <li
                     className={`page-item ${page === number ? "active" : ""}`}
                     key={number}
                  >
                     <span
                        className="page-link"
                        onClick={() => pageHandler(number)}
                        style={{
                           pointerEvents: `${page === number ? "none" : ""}`,
                        }}
                     >
                        {number}
                     </span>
                  </li>
               );
            })}

            <li
               className={`page-item ${
                  page === totalPage.length ? "disabled" : ""
               }`}
            >
               <span className="page-link" onClick={() => pageHandler("+1")}>
                  Next
               </span>
            </li>
         </ul>
      </nav>
   );
};

export default Pagination;
