import React from "react";
import StudentRow from "./StudentRow";

export default function StudentsList({ students }) {
  return (
    <div className="DivList">
      {students.length === 0 ? (
        <label className="redLabel">There Are No Students</label>
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
              <StudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
