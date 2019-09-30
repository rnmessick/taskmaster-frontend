import React from 'react';

export default function UpdateStatus(props) {
  function _updateStatus() {
    let API = `${props.api}/${props.data.id}`;

    fetch(API, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(() => props.reload());
  }

  return (
    <button onClick={_updateStatus}>Update Status</button>
  )
}