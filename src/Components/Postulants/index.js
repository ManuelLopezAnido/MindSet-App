import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import Modal from '../Postulants/Modal';
import ErrorMessageModal from '../Postulants/ErrorMessageModal';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [firstNameToDelete, setFirstNameToDelete] = useState('');
  const [lastNameToDelete, setLastNameToDelete] = useState('');
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
    const url = `${process.env.REACT_APP_API}/postulants/delete/${idToDelete}`;
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
        setPostulants(postulants.filter((postulants) => postulants._id !== idToDelete));
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
  };

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
  };

  const onShowModal = (event, id, firstName, lastName) => {
    event.stopPropagation();
    setShowModal(true);
    setIdToDelete(id);
    setFirstNameToDelete(firstName);
    setLastNameToDelete(lastName);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionPostulant={deletePostulant}
        idToUse={idToDelete}
        titleText="Warning"
        warningText="you are about to delete a postulant"
        buttonText="delete"
        text="Are you sure you want to delete"
        firstName={firstNameToDelete}
        lastName={lastNameToDelete}
      />
      <ErrorMessageModal
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <div className={styles.content}>
        <div className={styles.titleAndButton}>
          <h3>Postulants</h3>
          <Button value="Postulant" onClick={redirectToForm(null)} />
        </div>
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
                  <DeleteButton
                    onClick={(event) =>
                      onShowModal(event, postulant._id, postulant.firstName, postulant.lastName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Postulants;
