import React, { useEffect, useState } from "react";
import { performGetAllTeachers } from "../store/teachers/slice";
import { useDispatch, useSelector } from "react-redux";
import { teachersSelector } from "../store/teachers/selectors";
import TeachersList from "../components/teachers/TeachersList";
import FilterForm from "../components/FilterForm";

export default function AppTeachers() {
  const dispatch = useDispatch();
  const [tchFetchParams, setTchFetchParams] = useState({
    loadCount: 10,
    filterParameter: "",
  });
  const teachers = useSelector(teachersSelector);

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = async (fetchParams = tchFetchParams) => {
    dispatch(performGetAllTeachers(fetchParams));
  };

  return (
    <div className="Center">
      <h1>Teachers</h1>
      <br/>
      <label>Filter By Name: </label>
      <FilterForm
        fetchParams={tchFetchParams}
        setFetchParams={setTchFetchParams}
        handleGetData={handleGetTeachers}
        defaultLoadCount={""}
      />

      {!(teachers.length === 0) ? (
        <TeachersList teachers={teachers} />
      ) : (
        <p className="redLabel">No Available Teachers</p>
      )}
    </div>
  );
}
