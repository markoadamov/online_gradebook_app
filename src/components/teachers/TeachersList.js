import React from 'react'
import TeacherRow from './TeacherRow'

export default function TeachersList({teachers}) {
  return (
    <div className="DivGradebookList">
      <table className="GradebookListTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gradebook Name</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <TeacherRow key={teacher.id} teacher={teacher} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
