import React from 'react'
import { Link } from "react-router-dom";
export default function GradebookRow({gradebook}) {

  const formatDate = () => {
    const date = new Date(gradebook.created_at);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(day)}.${pad(month)}.${year} - ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return (
    <tr>
      <td><Link to={`gradebooks/${gradebook.id}`}>{gradebook.name}</Link></td>
      <td>{gradebook.user_id?<Link to={`teachers/${gradebook.user_id}`}>{gradebook.user_name}</Link>:<label className='redLabel'>Not Assigned</label>}</td>
      <td>{formatDate()}</td>
    </tr>
  )
}
