import React from 'react'

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
      <td>{gradebook.name}</td>
      <td>{gradebook.user_id?gradebook.user_name:<label className='redLabel'>Not Assigned</label>}</td>
      <td>{formatDate()}</td>
    </tr>
  )
}
