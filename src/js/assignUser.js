import React, { useState, useEffect } from 'react';

export default function AssignUser(props) {
  const [assignee, setAssignee] = useState({});
  let API = `${props.api}/${props.data.id}/assign/${assignee.assignee}`;

  const _handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setAssignee({ [field]: value });
  }

  useEffect(() => {
    fetch(API, { mode: 'cors' })
      .then(data => data.json())
      .then(task => { console.log(task) })
      .catch(console.error);
  });

  const _assignUser = (e) => {
    e.preventDefault();

    fetch(API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then(response => response.json())
      .then(() => props.reload());
  }

  return (
    <form onSubmit={_assignUser}>
      <label className="user" htmlFor="assignee"><b>Assign a user</b></label>
      <input className="user" onChange={_handleChange} type="text" name="assignee" id="assignee" defaultValue={props.data.assignee} />
    </form>
  )
}