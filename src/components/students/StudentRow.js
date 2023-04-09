import React from 'react'
import { Link } from "react-router-dom";
export default function StudentRow({student}) {

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
    </tr>
  )
}
