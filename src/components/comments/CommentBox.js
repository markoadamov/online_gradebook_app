import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { activeUserSelector } from '../../store/authentication/selectors';

export default function CommentBox({comment, handleDeleteComment}) {

  const activeUser = useSelector(activeUserSelector);
  const [firstClick, setFirstClick] = useState(true);

  const formatDate = () => {
    const date = new Date(comment.created_at);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(day)}.${pad(month)}.${year} - ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return (
    <>
      <tr>
        <td>
          <div>{comment.user_name}</div>
          <div>
            <small>{formatDate()}</small>
          </div>
        </td>
        <td>
          <div>{comment.body}</div>
          <div>
            {activeUser.id === comment.user_id && (
              <button
                className="DeleteComment"
                onClick={
                  firstClick
                    ? () => {
                        handleDeleteComment(comment.id, setFirstClick);
                      }
                    : null
                }
              >
                Delete
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
