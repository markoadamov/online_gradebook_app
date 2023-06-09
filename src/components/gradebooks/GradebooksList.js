import React from 'react'
import GradebookRow from './GradebookRow'

export default function GradebooksList({gradebooks}) {
  return (
    <div className="DivList">
      <table className="GradebooksTable">
        <thead>
          <tr>
            <th>Gradebook Name</th>
            <th>Class Teacher</th>
            <th>Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {gradebooks.map((gradebook) => (
            <GradebookRow key={gradebook.id} gradebook={gradebook} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
