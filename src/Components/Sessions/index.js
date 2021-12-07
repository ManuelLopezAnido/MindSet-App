import styles from './sessions.module.css';
import { useState, useEffect } from 'react';
import ModalSession from './Modal/ModalSession';
import ErrorMessageModal from './ErrorMessageModal/ErrorMessageModal';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions/`)
      .then((response) => response.json())
      .then((response) => {
        saveSessions(response.Sessions);
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
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

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
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
      <ErrorMessageModal
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <div className={styles.titleAndButton}>
        <h3>Sessions</h3>
        <Button onClick={addSession} value="Session" />
      </div>
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
                <DeleteButton onClick={(event) => handleIdSession(event, session._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Sessions;
