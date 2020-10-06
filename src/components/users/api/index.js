//url
const url = process.env.REACT_APP_API_URL;

//read user profile
export const read = (userId) => {
   return fetch(`${url}/user/${userId}`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         // Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//update profile
export const update = (userId, token, user) => {
   return fetch(`${url}/user/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: user,
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//remove user account
export const remove = (userId, token) => {
   return fetch(`${url}/user/${userId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//get all users
export const list = (page) => {
   return fetch(`${url}/users/?page=${page}`, {
      method: "GET",
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//updated local storage user
export const updateUser = (user, next) => {
   if (typeof window !== "undefined") {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
         const auth = JSON.parse(jwt);
         auth.user = user;
         localStorage.setItem("jwt", JSON.stringify(auth));
         next();
      }
   }
};

//follow unFollow
export const follow = (userId, token, followId) => {
   return fetch(`${url}/user/follow`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, followId }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
//follow unFollow
export const unFollow = (userId, token, unFollowId) => {
   return fetch(`${url}/user/unfollow`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, unFollowId }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//find people
export const findPeople = (userId, token, page) => {
   return fetch(`${url}/user/findpeople/${userId}/?page=${page}`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//forgot password
export const forgotPassword = (email) => {
   return fetch("http://localhost:8080/forgot-password", {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

export const resetPassword = (resetPasswordLink, newPassword) => {
   return fetch(`${url}/reset-password`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetPasswordLink, newPassword }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
