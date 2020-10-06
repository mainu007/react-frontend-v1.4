import React from "react";
import MainRouter from "./routers";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/mdb-ui-kit/css/mdb.min.css";
import * as mdb from "mdb-ui-kit";

function App() {
   return (
      <BrowserRouter>
         <MainRouter />
      </BrowserRouter>
   );
}

export default App;
