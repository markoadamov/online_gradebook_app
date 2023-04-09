import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performAddNewGradebook } from "../store/gradebooks/slice";
import { performGetAllTeachers } from "../store/teachers/slice";
import { teachersSelector } from "../store/teachers/selectors";
import { gradebooksErrorsSelector } from "../store/gradebooks/selectors";
import { useHistory } from 'react-router-dom';

export default function AddGradebook() {
  const dispatch = useDispatch();
  const teachers = useSelector(teachersSelector);
  const errors = useSelector(gradebooksErrorsSelector);
  const [newGradebook, setNewGradebook] = useState({ name: "", user_id: "" });
  let history = useHistory();

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = async () => {
    dispatch(performGetAllTeachers({
      loadCount: "",
      filterParameter: "",
      onlyFree: 1 // 1 znaci da vrati samo slobodne profesore (one koji nisu razredne staresine)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(performAddNewGradebook(newGradebook));
  };

  const handleCancel = () => {
    history.push("/gradebooks");
  }

  const assignSelectedTeacher = (e) => {
    setNewGradebook({ ...newGradebook, user_id: Number(e.target.value) });
  }

  // const TestConsole = () => {
  //   console.log(errors);
  // }

  return (
    <div className="Center">
      <form onSubmit={handleSubmit} className="AddGradebookForm">
        <h1>Add Gradebook:</h1>
        <input
          placeholder="Gradebook name"
          type="text"
          value={newGradebook.name}
          onChange={(e) => {
            setNewGradebook({ ...newGradebook, name: e.target.value });
          }}
          //minLength="2"
          //required
        />
        {!(errors.length===0)&&<label className="redLabel"><br/>{errors}</label>}
        <br/>
        <select
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
        <br/>
      <button>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
