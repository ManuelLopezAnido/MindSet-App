import styles from './sessions.module.css';
import { useState, useEffect } from 'react';
import deleteIcon from '../../assets/deleteIcon.png';
import ModalSession from './Modal/ModalSession';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions/`)
      .then((response) => response.json())
      .then((response) => {
        saveSessions(response.Sessions);
      });
  }, []);

  const addSession = () => {
    window.location.href = `/sessions/form`;
  };

  const deleteSession = (id) => {
    const url = `${process.env.REACT_APP_API}/sessions/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
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
    closeModal();
    saveSessions(sessions.filter((session) => session._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdSession = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <ModalSession
        show={showModal}
        closeModal={closeModal}
        deleteSession={deleteSession}
        selectedId={selectedId}
      />
      <h2>Clients</h2>
      <table>
        <thead>
          <th>Postulant Id</th>
          <th>Counselor Id</th>
          <th>Date</th>
          <th>Time</th>
          <th>Accomplished</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              onClick={() => (window.location.href = `sessions/form?id=${session._id}`)}
              className={styles.sessionRow}
            >
              <td>{`${session.postulantId?.firstName} ${session.postulantId?.lastName}`}</td>
              <td>{session.counselorId?.firstName}</td>
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td>{session.accomplished.toString()}</td>
              <td className={styles.deleteButtonTD}>
                <button
                  className={styles.deleteIcon}
                  onClick={(event) => handleIdSession(event, session._id)}
                >
                  <img src={deleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addSession}>
        ADD SESSION
      </button>
    </section>
  );
}

export default Sessions;
