import styles from './sessions.module.css';
import { useState, useEffect } from 'react';
import deleteIcon from '../../assets/deleteIcon.png';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions/`)
      .then((response) => response.json())
      .then((response) => {
        saveSessions(response.Sessions);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      });
  }, []);

  const addSession = () => {
    window.location.href = `/sessions/form`;
  };

  const deleteSession = () => {
    const url = `${process.env.REACT_APP_API}/sessions/${selectedId}`;
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
        saveSessions(sessions.filter((session) => session._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setShowModal(false));
  };

  const handleIdSession = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deleteSession}
        selectedId={selectedId}
        titleText="Delete a session"
        spanObjectArray={[
          {
            span: 'are you sure you want to delete this session?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
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
