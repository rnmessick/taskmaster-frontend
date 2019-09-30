import React, { useState, useEffect } from 'react';

import './app.scss';
import UpdateStatus from './js/updateStatus.js';
import History from './js/history.js';
import DeleteTask from './js/deleteTask.js';
import AssignUser from './js/assignUser.js';
import AddTask from './js/addNewTask.js';
// import AddImage from './js/addImage.js';


function App() {
  const API = 'https://vv7fgjnxgi.execute-api.us-west-2.amazonaws.com/dev';
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API + '/tasks')
      .then(data => data.json())
      .then(fetchedTasks => {
        setTasks(fetchedTasks);
      });
  }

  useEffect(_getTasks, []);

  return (
    <React.Fragment>
      <header >
        <h1>TaskMaster</h1>
      </header>
      <div >
        <h1>Task List</h1>
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <details>
                  <summary>
                    <span>{task.title}</span><br />
                    <span>{task.description}</span>

                  </summary>
                  <span>Assigned: {task.assignee}</span><br></br>
                  <span>Status: {task.getAction}</span>
                  {/* <img src={task.image} alt={task.title} /> */}
                  <History api={API} history={task.history} reload={_getTasks} />
                  <AssignUser api={API} data={task} reload={_getTasks}>  </AssignUser>
                  <UpdateStatus api={API} data={task} reload={_getTasks} />
                  <br />
                  <DeleteTask api={API} data={task} reload={_getTasks} />

                </details>
              </li>
            )
          })}
        </ul>
        <AddTask api={API} reload={_getTasks} />
      </div>
    </React.Fragment>
  );
}

export default App;