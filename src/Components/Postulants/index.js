import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import deleteImage from '../../assets/images/deleteIcon.png';
import Modal from '../Postulants/Modal';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [firstNameToDelete, setFirstNameToDelete] = useState('');
  const [lastNameToDelete, setLastNameToDelete] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => setPostulants(response))
      .catch((error) => console.log(error));
  }, []);

  const deletePostulant = () => {
    const url = `${process.env.REACT_APP_API}/postulants/delete/${idToDelete}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            console.log(message);
            throw new Error(message);
          });
        }
        setPostulants(postulants.filter((postulants) => postulants._id !== idToDelete));
      })
      .catch((error) => error);
  };

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onShowModal = (event, id, firstName, lastName) => {
    console.log(id);
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
                  <button
                    type="button"
                    onClick={(event) =>
                      onShowModal(event, postulant._id, postulant.firstName, postulant.lastName)
                    }
                  >
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
