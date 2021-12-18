import styles from './sessions.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions, deleteSession } from '../../redux/sessions/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from '../../redux/sessions/actions';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const sessions = useSelector((store) => store.sessions.list);
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);
  const errorMessage = useSelector((store) => store.sessions.errorMessage);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    }
  }, [sessions]);

  const onClickDelete = () => {
    dispatch(deleteSession(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSession = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onClickDelete}
        selectedId={selectedId}
        titleText="Delete a session"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this session?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Sessions</h3>
        <Button onClick={() => history.push('/sessions/form')} />
      </div>
      <table className={styles.sessionsTable}>
        <thead>
          <tr>
            <th>Postulant Id</th>
            <th>Counselor Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Accomplished</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              onClick={() => (window.location.href = `sessions/form?id=${session._id}`)}
              className={styles.sessionRow}
            >
              <td>{session.postulantId?.firstName + session.postulantId?.lastName}</td>
              <td>{session.counselorId ? session.counselorId.firstName : 'Not found'}</td>
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td>{session.accomplished.toString()}</td>
              <td className={styles.deleteButtonTD}>
                <DeleteButton onClick={(event) => handleSession(event, session._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Sessions;
