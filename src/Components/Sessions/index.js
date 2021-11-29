import styles from './sessions.module.css';
import { useState, useEffect } from 'react';
import deleteIcon from '../../assets/deleteIcon.png';

function Sessions() {
  const [sessions, saveSessions] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/sessions/`)
    .then((response) => response.json())
    .then((response) => {
      saveSessions(response.Sessions);
    });
  }, []);

  const addSession = () => {
    window.location.href = `/sessions/form`;
  };

  const deleteSession = (event, id) => {
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/api/sessions/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        return;
      })
      .catch((error) => error);
      saveSessions(sessions.filter((session) => session._id !== id));
  };

  // const handleIdSession = (event, id) => {
  // };

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <table>
        <thead>
          <th>Postulant Id</th>
          <th>Counselor Id</th>
          <th>Date</th>
          <th>Time</th>
          <th>Accomplished</th>
        </thead>
        <tbody>
          {sessions.map((session) => {
            return (
              <tr key={session._id} onClick={()=> window.location.href = `sessions/form?id=${session._id}`}>
                <td>{session.postulantId}</td>
                <td>{session.counselorId}</td>
                <td>{session.date}</td>
                <td>{session.time}</td>
                <td>{session.accomplished}</td>
                <td>
                  <button >
                    <img src={deleteIcon} onClick={(event) => deleteSession(event, session._id)} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addSession}>ADD SESSION</button>
    </section>
  );
}

export default Sessions;
