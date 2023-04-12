import React from "react";
import CommentBox from "./CommentBox";

export default function CommentsList({ comments, handleDeleteComment }) {
  return (
    <div className="DivList">
      {comments.length === 0 ? (
        <table className="CommentsTable">
          <thead>
            <tr>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>There Are No Comments In This Gradebook</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="CommentsTable">
          <thead>
            <tr>
              <th>Authors</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
