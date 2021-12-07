import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Admins/Modal';
import Error from '../Admins/Error';
import ErrorMessage from '../Admins/ErrorMessage';
import IsLoading from '../Shared/IsLoading/IsLoading';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.Admins);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addAdmin = () => {
    window.location.replace(`admins/form`);
  };

  const deleteAdmin = (id) => {
    setIsLoading(true);
    const options = {
      method: 'DELETE'
    };
    const url = `${process.env.REACT_APP_API}/admins/delete/${id}`;
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        saveAdmins(admins.filter((admin) => admin._id !== id));
        setShowModal(false);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  };

  const onShowModal = (id, event) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeError = () => {
    setShowErrorMessage(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        id={selectedId}
        delete={deleteAdmin}
        text="Are you sure you want to delete the admin selected?"
      ></Modal>
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
                  <button onClick={(event) => onShowModal(admin._id, event)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={styles.buttonAdd} disabled={showModal} onClick={() => addAdmin()}>
        Add Admin
      </button>
    </section>
  );
};

export default Admins;
