import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performEditGradebook } from "../store/gradebooks/slice";
import { performGetAllTeachers } from "../store/teachers/slice";
import { performGetAllStudents, performDeleteStudent } from "../store/students/slice";
import { teachersSelector } from "../store/teachers/selectors";
import { gradebooksErrorsSelector } from "../store/gradebooks/selectors";
import { useHistory, useParams } from 'react-router-dom';
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { studentsSelector } from "../store/students/selectors";
import { activeUserSelector } from "../store/authentication/selectors";
import { performGetSingleGradebook } from "../store/gradebooks/slice";
import StudentsList from "../components/students/StudentsList";

export default function EditGradebook() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const teachers = useSelector(teachersSelector);
    const students = useSelector(studentsSelector);
    const errors = useSelector(gradebooksErrorsSelector);
    const gradebook = useSelector(singleGradebookSelector);
    const [newGradebook, setNewGradebook] = useState({ name: "", user_id: "" });
    const activeUser = useSelector(activeUserSelector);

    let history = useHistory();
    const [firstClick, setFirstClick] = useState(true);

    useEffect(() => {
      if (activeUser.gradebook_id) {
        handleGetGradebook(activeUser.gradebook_id);
        handleGetTeachers();
        handleGetStudents();
      } else {
        console.log("You're not class teacher, access denied!");
      }
    }, [id]);

    useEffect(() => {
        setNewGradebook({name: gradebook.name, user_id: gradebook.user_id});
    }, [gradebook]);
    
      const handleGetGradebook = async (id) => {
        dispatch(performGetSingleGradebook(id));
     };

      const handleGetTeachers = async () => {
        dispatch(
          performGetAllTeachers({fetchParams: {
            loadCount: "",
            filterParameter: "",
            onlyFree: 1, // 1 znaci da vrati samo slobodne profesore (one koji nisu razredne staresine)
          }, setFirstClick: (e)=>{}})
        );
      };

      const handleGetStudents = async () => {
        dispatch(performGetAllStudents(id));
      }

      const handleRedirect = () => {
        history.goBack();
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        if (firstClick) {
          setFirstClick(false);
          dispatch(
            performEditGradebook({
              data: {
                gradebookToAdd: newGradebook,
                gradebook_id: gradebook.id,
              },
              redirect: handleRedirect,
              activeUser: activeUser,
              setFirstClick: setFirstClick,
            })
          );
        }
      };
    
      const handleCancel = () => {
        history.push("/gradebooks");
      }
    
      const assignSelectedTeacher = (e) => {
        setNewGradebook({ ...newGradebook, user_id: Number(e.target.value) });
      }

      const handleDeleteStudent = async (id, setFirstClick) => {
        const decision = window.confirm("Are you sure you want to delete?");
        if (decision) {
          setFirstClick(false);
          dispatch(performDeleteStudent(id));
        }
      }

      const renderGradebook = () => {
        return (
          <div className="Center">
            <form onSubmit={handleSubmit} className="EditGradebookForm">
              <h2>Edit Gradebook:</h2>
              <label>Gradebook Name: </label>
              <br />
              <input
                placeholder="Gradebook name"
                type="text"
                value={newGradebook.name || ""}
                onChange={(e) => {
                  setNewGradebook({ ...newGradebook, name: e.target.value });
                }}
                minLength="2"
                maxLength="255"
                required
              />
              {!(errors.length===0)&&<label className="redLabel"><br/>{errors}</label>}
              <br />
              <br />
              <label>Choose Class Teacher: </label>
              <br />
              <select
              className="SelectTacherAddEditGradebook"
                name="teacher"
                id="teacher"
                value={newGradebook.user_id || ""}  // Imao sam neki warrning pa sam dodao ovo || "", resava problem
                onChange={assignSelectedTeacher}
                //required
              >
                <option value={gradebook.user_id || ""}>{gradebook.user_name}</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {`${teacher.first_name} ${teacher.last_name}`}
                  </option>
                ))}
              </select>
              <br />
              <button className="ButtonsAddEditGradebook">Submit</button>
            </form>
              <button className="ButtonsAddEditGradebook" onClick={handleCancel}>Cancel</button>

            <StudentsList
              students={students}
              editMode={{ isEnabled: true, handleDeleteStudent }}
            />
          </div>
        );
      };

  return (
    <div className="Center">
      {activeUser.gradebook_id == id ? (
        renderGradebook()
      ) : (
        <label className="redLabel">
          You're not class teacher of this gradebook!
        </label>
      )}
    </div>
  );
}
