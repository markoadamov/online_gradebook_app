import React, { useEffect, useState } from "react";
import { performGetAllTeachers } from "../store/teachers/slice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { teachersSelector } from "../store/teachers/selectors";
import TeachersList from "../components/teachers/TeachersList";
import FilterForm from "../components/FilterForm";

export default function AppTeachers() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tchFetchParams, setTchFetchParams] = useState({
    loadCount: "", // "" znaci bez paginacije (vrati sve)
    filterParameter: "", // ime po kom filtriramo
    onlyFree: 0 // 0 znaci da vraca i slobodne i zauzete profesore (razredne staresine)
  });
  const teachers = useSelector(teachersSelector);

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = async (fetchParams = {fetchParams: tchFetchParams, setFirstClick: (e)=>{}}) => {
    dispatch(performGetAllTeachers(fetchParams));
  };

  return (
    <div className="Center">
      <h1>Teachers</h1>
      <br />
      <label>Filter By First Name: </label>
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
