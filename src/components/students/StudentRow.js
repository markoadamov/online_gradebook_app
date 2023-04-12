import React from 'react'
import { Link } from "react-router-dom";
export default function StudentRow({student, editMode}) {

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
      {editMode.isEnabled&&<td><button className='DeleteStudent' onClick={()=>{editMode.handleDeleteStudent(student.id)}}>Delete</button></td>}
    </tr>
  )
}
