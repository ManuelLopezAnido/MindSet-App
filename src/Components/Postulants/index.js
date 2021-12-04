import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import deleteImage from '../../assets/images/deleteIcon.png';
import Modal from '../Shared/Modal';
import ErrorMessageModal from '../Postulants/ErrorMessageModal';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => setPostulants(response))
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
  }, []);

  const deletePostulant = () => {
    const url = `${process.env.REACT_APP_API}/postulants/delete/${selectedId}`;
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
        setPostulants(postulants.filter((postulants) => postulants._id !== selectedId));
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
    closeModal();
  };

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdPostulant = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deletePostulant}
        selectedId={selectedId}
        titleText="Delete a postulant"
        middleText="are you sure you want to delete this postulant?"
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorMessageModal
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <div className={styles.content}>
        <h2 className={styles.header}>Postulants</h2>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableContent}>
            {postulants.map((postulant) => (
              <tr key={postulant._id} onClick={() => redirectToForm(postulant._id)}>
                <td>
                  <div>
                    {postulant?.firstName || '-'} {postulant?.lastName || '-'}
                  </div>
                </td>
                <td>
                  <div>{postulant?.country || '-'}</div>
                </td>
                <td>
                  <button onClick={(event) => handleIdPostulant(event, postulant._id)}>
                    <img src={deleteImage} alt="delete"></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={styles.button}
          id="addClient"
          type="button"
          onClick={() => redirectToForm(null)}
        >
          Add Postulant
        </button>
      </div>
    </div>
  );
};

export default Postulants;
