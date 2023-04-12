import React from "react";
import StudentRow from "./StudentRow";

export default function StudentsList({ students, editMode}) {
  return (
    <div className="DivList">
      {students.length === 0 ? (
        <table>
        <thead>
          <tr>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>There Are No Students In This Gradebook</td>
          </tr>
        </tbody>
      </table>
      ) : (
        <table className="ListTable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Fist Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} editMode={editMode}/>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
