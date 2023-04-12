import React, { useState } from "react";

export default function AddComment({user_id, gradebook_id, handleAddNewComment}) {

  const [newComment, setNewComment] = useState("");
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    handleAddNewComment({data: {body: newComment, user_id: user_id, gradebook_id: gradebook_id}});
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="AddCommentForm">
        <h1>Add Comment:</h1>
        <textarea
          className="AddCommentTextArea"
          placeholder="Your Comment"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          maxLength="1000"
          required
        />
        <br/>
      <button className="SubmitCommentButton">Submit Comment</button>
      </form>
    </div>
  )
}
