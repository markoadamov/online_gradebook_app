import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { performGetSingleTeacher } from "../store/teachers/slice";
import { useDispatch, useSelector } from "react-redux";
import { singleTeacherSelector } from "../store/teachers/selectors";

export default function SingleTeacher() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector(singleTeacherSelector);

  useEffect(() => {
    handleGetTeacher();
  }, []);

  const handleGetTeacher = async () => {
    dispatch(performGetSingleTeacher(id));
  };

  return (
    <div className="Center">
        <img
          src={teacher.image_url}
          alt="teacher_image"
          width="150"
          height="150"
        />
      <h2>
        Teacher Name: {teacher.first_name} {teacher.last_name}
      </h2>
      <h3>
        Email: {teacher.email}
      </h3>
      {teacher.gradebook_id ? (
        <div>
        <p>Gradebook Name: <Link to={`../gradebooks/${teacher.gradebook_id}`}>{teacher.gradebook_name}</Link></p>
        <p>Number of Students: {teacher.students_count}</p>
        </div>
      ) : (
        <label className="redLabel">Gradebook Not Assigned</label>
      )}
    </div>
  );
}
