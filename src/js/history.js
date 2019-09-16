import React from 'react';

export default function History(props) {
  return (
    <ol>
      {props.history.map((record, idx) => {
        return (
          <li key={idx}>
            <span>Date: {record.time}</span><br />
            <span>Action: {record.action}</span>
          </li>
        )
      })}
    </ol>
  )
}