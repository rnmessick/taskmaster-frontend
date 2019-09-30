import React, { useState, useEffect } from 'react';

export default function AddTask(props) {
  //for uploads
  let form = new FormData();

  //for JSON version of the form
  const [formData, setFormData] = useState({});


  const API = 'https://vv7fgjnxgi.execute-api.us-west-2.amazonaws.com/dev/tasks';

  function _handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function _handleSubmit(event) {
    event.preventDefault();
    fetch(`${API}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .catch(error => console.error('Error', error))
      .then(response => console.log('Success:', response));
  }

  useEffect(() => {
    fetch(API, { mode: 'cors' })
      .then(data => data.json())
      .then(task => { console.log(task) })
      .catch(console.error);
  });

  return (
    <form onSubmit={_handleSubmit}>
      <fieldset>
        <legend>Add a new task:</legend>
        <div>
          <label >Task Title</label>
          <input onChange={_handleChange} type="text" name="title" id="title"></input>
        </div>
        <div>
          <label >Description</label>
          <textarea onChange={_handleChange} type="text" name="description" id="description" rows="4" cols="50"></textarea>
        </div>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  )
}