import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import deleteImage from '../../assets/images/deleteIcon.png';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => setPostulants(response))
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      });
  }, []);

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

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
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setShowModal(false));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdPostulant = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deletePostulant}
        selectedId={selectedId}
        titleText="Delete a postulant"
        leftButtonText="delete"
        rightButtonText="cancel"
        spanObjectArray={[
          {
            span: 'do you want to delete this postulant'
          }
        ]}
      />
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
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
