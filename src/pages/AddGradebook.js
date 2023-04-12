import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performAddNewGradebook } from "../store/gradebooks/slice";
import { performGetAllTeachers } from "../store/teachers/slice";
import { teachersSelector } from "../store/teachers/selectors";
// import { gradebooksErrorsSelector } from "../store/gradebooks/selectors";
import { useHistory } from "react-router-dom";
import { activeUserSelector } from "../store/authentication/selectors";

export default function AddGradebook() {
  const dispatch = useDispatch();
  const teachers = useSelector(teachersSelector);
  // const errors = useSelector(gradebooksErrorsSelector);
  const [newGradebook, setNewGradebook] = useState({ name: "", user_id: "" });
  let history = useHistory();
  const activeUser = useSelector(activeUserSelector);

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = async () => {
    dispatch(
      performGetAllTeachers({
        loadCount: "",
        filterParameter: "",
        onlyFree: 1, // 1 znaci da vrati samo slobodne profesore (one koji nisu razredne staresine)
      })
    );
  };

  const handleRedirect = () => {
    history.push("/gradebooks");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      performAddNewGradebook({
        data: newGradebook,
        redirect: handleRedirect,
        activeUser: activeUser,
      })
    );
  };

  const handleCancel = () => {
    history.push("/gradebooks");
  };

  const assignSelectedTeacher = (e) => {
    setNewGradebook({ ...newGradebook, user_id: Number(e.target.value) });
  };

  return (
    <div className="Center">
      <form onSubmit={handleSubmit} className="AddGradebookForm">
        <h2>Add Gradebook:</h2>
        <label>Gradebook Name: </label>
        <br />
        <input
          placeholder="Gradebook name"
          type="text"
          value={newGradebook.name}
          onChange={(e) => {
            setNewGradebook({ ...newGradebook, name: e.target.value });
          }}
          minLength="2"
          maxLength="255"
          required
        />
        {/* {!(errors.length === 0) && (  //Ovo sam pisao ali nema potrebe kad imam gore validaciju u inputu
          <label className="redLabel">
            <br />
            {errors}
          </label>
        )} */}
        <br />
        <br />
        <label>Choose Class Teacher: </label>
        <br />
        <select
          className="SelectTacherAddEditGradebook"
          name="teacher"
          id="teacher"
          value={newGradebook.user_id}
          onChange={assignSelectedTeacher}
          //required
        >
          <option value="">Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {`${teacher.first_name} ${teacher.last_name}`}
            </option>
          ))}
        </select>
        <br />
        <button className="ButtonsAddEditGradebook">Submit</button>
      </form>
      <button className="ButtonsAddEditGradebook" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}
