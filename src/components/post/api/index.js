//url
const url = process.env.REACT_APP_API_URL;

export const create = (userId, token, post) => {
   return fetch(`${url}/post/new/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: post,
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

export const list = (currentPage) => {
   return fetch(`${url}/posts/?page=${currentPage}`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//single post
export const singlePost = (postId) => {
   return fetch(`${url}/post/${postId}`, { method: "GET" })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//user by posts
export const postsByUser = (userId, token) => {
   return fetch(`${url}/posts/single-list/${userId}`, {
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

export const singleUserPosts = (posterId, token, page) => {
   return fetch(`${url}/posts/by/${posterId}/?page=${page}`, {
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

//remove post
export const remove = (postId, token) => {
   return fetch(`${url}/post/${postId}`, {
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

//update post
export const update = (postId, token, post) => {
   console.log("update -> token", token);
   return fetch(`${url}/post/${postId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: post,
   });
};

//like unlike
export const like = (userId, token, postId) => {
   return fetch(`${url}/post/like`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
export const unlike = (userId, token, postId) => {
   return fetch(`${url}/post/unlike`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

//comment uncomment
export const comment = (userId, token, postId, comment) => {
   return fetch(`${url}/post/comment`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId, comment }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
   return fetch(`${url}/post/uncomment`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId, comment }),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
