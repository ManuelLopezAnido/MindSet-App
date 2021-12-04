import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Error from '../Admins/Error';
import ErrorMessage from '../Admins/ErrorMessage';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.Admins);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      });
  }, []);

  const addAdmin = () => {
    window.location.replace(`admins/form`);
  };

  const deleteAdmin = () => {
    const options = {
      method: 'DELETE'
    };
    const url = `${process.env.REACT_APP_API}/admins/delete/${selectedId}`;
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        saveAdmins(admins.filter((admin) => admin._id !== selectedId));
        setShowModal(false);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      });
  };

  const handleIdPostulant = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeError = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deleteAdmin}
        selectedId={selectedId}
        titleText="Delete an Admin"
        middleText="are you sure you want to delete this admin?"
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorMessage show={showErrorMessage} close={closeError} text={errorMessageText} />
      <h2 className={styles.header}>Admins</h2>
      <table className={styles.list}>
        <thead>
          <tr>
            <th> Email </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr
                key={admin._id}
                onClick={() => {
                  window.location.replace(`admins/form?id=${admin._id}`);
                }}
              >
                <td>{admin.email}</td>
                <td>
                  <button onClick={(event) => handleIdPostulant(event, admin._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={styles.buttonAdd} disabled={showModal} onClick={() => addAdmin()}>
        Add Admin
      </button>
    </div>
  );
};

export default Admins;
