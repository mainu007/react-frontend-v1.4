import React from "react";
import LoadingSmall from "../LoadingSmall";

const PostForm = ({ title, body, handleChange, clickPost, formLoading }) => {
   return (
      <form>
         <div className="form-group">
            <label className="text-muted">Post Photo</label>
            <input
               onChange={handleChange("photo")}
               type="file"
               accept="image/*"
               className="form-control"
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Title</label>
            <input
               onChange={handleChange("title")}
               type="text"
               className="form-control"
               value={title}
            />
         </div>
         <div className="form-group">
            <label className="text-muted">Body</label>
            <textarea
               onChange={handleChange("body")}
               type="text"
               className="form-control"
               value={body}
               rows={6}
            />
         </div>
         <div>
            <button
               onClick={clickPost}
               type="submit"
               className="btn btn-primary btn-raised mt-2"
            >
               Update Post
            </button>
            {formLoading && (
               <div className="mt-2 float-right">
                  <LoadingSmall />
               </div>
            )}
         </div>
      </form>
   );
};

export default PostForm;
