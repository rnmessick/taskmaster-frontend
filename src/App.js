import React, { useState, useEffect } from 'react';

import './app.scss';
import UpdateStatus from './js/updateStatus.js';
import History from './js/history.js';
import DeleteTask from './js/deleteTask.js';
import AssignUser from './js/assignUser.js';
import AddTask from './js/addNewTask.js';
import AddImage from './js/addImage.js';


function App() {
  const API = 'http://taskmasterbackend-env.yzch9c73jx.us-west-2.elasticbeanstalk.com/api/v1/tasks';
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then(data => data.json())
      .then(fetchedTasks => setTasks(fetchedTasks));
  }

  useEffect(_getTasks, []);

  return (
    <React.Fragment>
      <header className="jumbotron">
        <h1>TaskMaster</h1>
      </header>
      <div className="App container">
        <h1>Task List</h1>
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <details>
                  <summary>
                    <span>{task.title}</span><br />
                  </summary>
                  <img src={task.image} alt={task.title} />
                  <History history={task.history} />
                  <AssignUser api={API} data={task} reload={_getTasks} />
                  <UpdateStatus api={API} data={task} reload={_getTasks} />
                  <br />
                  <AddImage api={API} data={task} reload={_getTasks} />
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