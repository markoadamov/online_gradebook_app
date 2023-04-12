import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performAddNewStudent } from "../store/students/slice";
import { studentsErrorsSelector } from "../store/students/selectors";
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { activeUserSelector } from "../store/authentication/selectors";

export default function AddStudent() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //const errors = useSelector(studentsErrorsSelector);
  const [newStudent, setNewStudent] = useState({ first_name: "", last_name: "", image_url: "", gradebook_id: id });
  let history = useHistory();
  const activeUser = useSelector(activeUserSelector);
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const location = useLocation();
  const errors = useSelector(studentsErrorsSelector);

  useEffect(() => {
    setIsClassTeacher(id == activeUser.gradebook_id)
    setNewStudent({...newStudent, gradebook_id: id});
  }, [location]);

  const handleRedirect = () => {
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id == activeUser.gradebook_id) {
      dispatch(performAddNewStudent({data: newStudent, redirect: handleRedirect}));
    } else {
      console.log("You are not class teacher of this gradebook! Can't add new student!");
    }
  };

  function handleErrorMessages(errors) {
    return (
      <div>
        {errors.map((errorMessage, index) => {
          console.log(errorMessage);
          return (
            <small key={index} style={{ color: "red" }}>
              {errorMessage}
              <br />
            </small>
          );
        })}
      </div>
    );
  };

  return (
    <div className="Center">
      {isClassTeacher?
      <form onSubmit={handleSubmit} className="AddStudentForm">
        <h1>Add Student:</h1>
        <input
          placeholder="First Name"
          type="text"
          value={newStudent.first_name}
          onChange={(e) => {
            setNewStudent({ ...newStudent, first_name: e.target.value });
          }}
          //minLength="2"
          //required
        />
        {errors.first_name ? handleErrorMessages(errors.first_name):<br/>}
        <input
          placeholder="Last Name"
          type="text"
          value={newStudent.last_name}
          onChange={(e) => {
            setNewStudent({ ...newStudent, last_name: e.target.value });
          }}
          //minLength="2"
          //required
        />
        {errors.last_name ? handleErrorMessages(errors.last_name):<br/>}
        <input
          placeholder="Image Url"
          type="text"
          value={newStudent.image_url}
          onChange={(e) => {
            setNewStudent({ ...newStudent, image_url: e.target.value });
          }}
          //minLength="2"
          //required
        />
        {errors.image_url ? handleErrorMessages(errors.image_url):<br/>}
        <br/>
      <button>Submit</button>
      </form>:<p>You are not class teacher of this gradebook! Can't add new student!</p>}
    {/* <button onClick={testActiveUser}>Test</button> */}
    </div>
  );
}
