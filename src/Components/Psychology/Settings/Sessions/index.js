import listStyles from 'lists.module.css';
import { useState, useEffect } from 'react';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/AddButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions, deleteSession } from 'redux/sessions/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/sessions/actions';

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
    <section className={listStyles.container}>
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
      <div className={listStyles.titleAndButton}>
        <Button onClick={() => history.push('/psychologists/sessions/form')} />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              onClick={() => (window.location.href = `sessions/form?id=${session._id}`)}
            >
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td className={listStyles.deleteButtonTD}>
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
