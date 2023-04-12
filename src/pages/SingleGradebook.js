import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  performGetSingleGradebook,
  performDeleteGradebook,
} from "../store/gradebooks/slice";
import {
  performGetAllComments,
  performAddNewComment,
  performDeleteComment,
} from "../store/comments/slice";
import { useDispatch, useSelector } from "react-redux";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { commentsSelector } from "../store/comments/selectors";
import StudentsList from "../components/students/StudentsList";
import { activeUserSelector } from "../store/authentication/selectors";
import { Link } from "react-router-dom";
import CommentsList from "../components/comments/CommentsList";
import AddComment from "../components/comments/AddComment";

export default function SingleGradebook({ isMyGradebookPage }) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const gradebook = useSelector(singleGradebookSelector);
  const comments = useSelector(commentsSelector);
  const activeUser = useSelector(activeUserSelector);
  let history = useHistory();
  const location = useLocation();
  const [currentGradebookId, setCurrentGradebookId] = useState();
  const [firstClick, setFirstClick] = useState(true);

  useEffect(() => {
    if (isMyGradebookPage && activeUser.gradebook_id) {
      setCurrentGradebookId(activeUser.gradebook_id);
      handleGetGradebook(activeUser.gradebook_id);
    } else if (isMyGradebookPage && !activeUser.gradebook_id) {
      setCurrentGradebookId(0); // ako se korisnik nalazi na stranici my-gradebook i nema dodeljen gradebook currentGradebookId je 0 sto znaci da treba da mu se ispise poruka da nije nikome razredni staresina
    } else {
      setCurrentGradebookId(id);
      handleGetGradebook(id);
    }
    
  }, [id]);

  useEffect(() => {
    if (isMyGradebookPage && activeUser.gradebook_id) {
      handleGetComments(activeUser.gradebook_id);
    } else {
      handleGetComments(id);
    }
  }, [location]);

  const handleRedirect = () => {
    history.push("/");
  };

  const handleDeleteGradebook = async () => {
    const decision = window.confirm("Are you sure you want to delete?");
    if (decision) {
      setFirstClick(false);
      dispatch(
        performDeleteGradebook({
          idToDelete: currentGradebookId,
          redirect: handleRedirect,
          activeUser: activeUser,
          setFirstClick: setFirstClick
        })
      );
    }
  };

  const handleGetGradebook = async (id) => {
    dispatch(performGetSingleGradebook(id));
  };

  const handleGetComments = async (id) => {
    dispatch(performGetAllComments(id));
  };

  const handleAddNewComment = async (data) => {
    data.setFirstClick(false);
    dispatch(performAddNewComment(data));
  };

  const handleDeleteComment = async (id, setFirstClick) => {
    const decision = window.confirm("Are you sure you want to delete?");
    if (decision) {
      setFirstClick(false);
      dispatch(performDeleteComment(id));
    }
  };

  const renderAddEditDeleteButtons = () => {
    return (
      <div>
        <button className="AddNewStudent">
          <Link to={`/gradebooks/${currentGradebookId}/students/create`}>
            Add New Students
          </Link>
        </button>
        <button className="EditGradebook">
          <Link to={`/gradebooks/${currentGradebookId}/edit`}>
            Edit Gradebook
          </Link>
        </button>
        <button className="DeleteGradebook" onClick={firstClick?()=>{handleDeleteGradebook(setFirstClick)}:null}>
          Delete Gradebook
        </button>
      </div>
    );
  };

  const renderGradebook = () => {
    return (
      <div>
        <div className="DivList">
          <table className="Header">
            <thead>
              <tr>
                <th>
                  {(activeUser.id != gradebook.user_id) || activeUser.id == null ? (
                    <label className="redLabel">Not Your Class</label>
                    ) : (
                    renderAddEditDeleteButtons()
                  )}
                </th>
                <th>
                  <h2>Gradebook Name: {gradebook.name}</h2>
                </th>
                <th>
                  <p>
                    Class Teacher:
                    {gradebook.user_id ? (
                      <label> {gradebook.user_name}</label>
                    ) : (
                      <label className="redLabel"> Not Assigned</label>
                    )}
                  </p>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        {gradebook.class_students && (
          <StudentsList
            students={gradebook.class_students}
            editMode={{ isEnabled: false }}
          />
        )}
        <CommentsList
          comments={comments}
          handleDeleteComment={handleDeleteComment}
        />
        <AddComment
          user_id={activeUser.id}
          gradebook_id={gradebook.id}
          handleAddNewComment={handleAddNewComment}
        />
      </div>
    );
  };

  return (
    <div className="Center">
      {currentGradebookId ? (
        renderGradebook()
      ) : (
        <p className="redLabel">You're not a class teacher of any class</p>
      )}
    </div>
  );
}
