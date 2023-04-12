import React from "react";
import { Link } from "react-router-dom";

export default function TeacherRow({ teacher }) {
  return (
    <tr>
      <td style={{ width: "50px" }}>
        <img
          src={teacher.image_url}
          alt="teacher_image"
          width="50"
          height="50"
        />
      </td>
      <td>{teacher.first_name}</td>
      <td>{teacher.last_name}</td>
      <td>{teacher.gradebook_id ? teacher.gradebook_name :<label className='greenLabel'>Professor is available</label>}</td>
    </tr>
  );
}
