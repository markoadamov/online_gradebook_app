import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { performGetSingleGradebook } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import StudentsList from "../components/students/StudentsList";

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
    <div>
      <div className="Center">
        <div className="DivList">
          <table className="Header">
            <thead>
              <tr>
                <th>
                  <button className="AddNewStudent">Add New Students</button>
                </th>
                <th>
                  <h2>Gradebook Name: {gradebook.name}</h2>
                </th>
                <th>
                  <p>
                    Class Teacher:
                    {gradebook.user_id ? (
                      gradebook.user_name
                    ) : (
                      <label className="redLabel">Not Assigned</label>
                    )}
                  </p>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        { gradebook.class_students &&
          <StudentsList students={gradebook.class_students} /> }
      </div>
    </div>
  );
}
