import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { performGetSingleGradebook } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { singleGradebookSelector } from "../store/gradebooks/selectors";

export default function SingleGradebook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gradebook = useSelector(singleGradebookSelector);

  useEffect(() => {
    handleGetGradebook();
  }, []);

  const handleGetGradebook = async () => {
    dispatch(performGetSingleGradebook(id));
  };

  return (
    <div className="Center">
      <h2>Single Gradebook</h2>
      <p>ID: {gradebook.id}</p>
      <p>Name: {gradebook.name}</p>
      <p>Class Teacher: {gradebook.user_id?gradebook.user_name:<label className='redLabel'>Not Assigned</label>}</p>
    </div>
  );
}
