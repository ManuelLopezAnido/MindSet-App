import styles from './sessions.module.css';
import { useState, useEffect } from 'react';

function Sessions() {
  const [sessions, saveSessions] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/sessions/`)
    .then((response) => response.json())
    .then((response) => {
      saveSessions(response.Sessions);
    });
  }, []);

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
              <tr key={session._id}>
                <td>{session.postulantId}</td>
                <td>{session.counselorId}</td>
                <td>{session.date}</td>
                <td>{session.time}</td>
                <td>{session.accomplished.toString()}</td>
                <td>
                  <button >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={styles.addButton}>ADD SESSION</button>
    </section>
  );
}

export default Sessions;
