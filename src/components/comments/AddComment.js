import React, { useState } from "react";

export default function AddComment({user_id, gradebook_id, handleAddNewComment}) {

  const [newComment, setNewComment] = useState("");
  const [firstClick, setFirstClick] = useState(true);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (firstClick) {
      handleAddNewComment({
        comment: {
          body: newComment,
          user_id: user_id,
          gradebook_id: gradebook_id,
        },
        setFirstClick: setFirstClick,
      });
    }
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
