//url
const url = process.env.REACT_APP_API_URL;

//signup method
export const signup = (user) => {
   return fetch(`${url}/signup`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//signin method
export const signin = (user) => {
   return fetch(`${url}/signin`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

export const authenticate = (jwt, next) => {
   if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
   }
};

//signout method
export const signout = (next) => {
   //delete cookie from localStorage
   if (typeof window !== "undefined") localStorage.removeItem("jwt");
   //action route
   next();
   //signout database
   fetch(`${url}/signout`, { method: "GET" })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
   //check window object
   if (typeof window == "undefined") {
      return false;
   }
   //check localStorage token
   if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
   } else {
      return false;
   }
};

//social login
export const socialLogin = (user) => {
   return fetch(`${url}/social-login/`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};
