import React, { useState } from 'react'
export default function StudentRow({student, editMode}) {

  const [firstClick, setFirstClick] = useState(true);

  return (
    <tr>
      <td style={{ width: "50px" }}>
        <img
          src={student.image_url}
          alt="student_image"
          width="50"
          height="50"
        />
      </td>
      <td>{student.first_name}</td>
      <td>{student.last_name}</td>
      {editMode.isEnabled && (
        <td>
          <button
            className="DeleteStudent"
            onClick={
              firstClick
                ? () => {
                    editMode.handleDeleteStudent(student.id, setFirstClick);
                  }
                : null
            }
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
