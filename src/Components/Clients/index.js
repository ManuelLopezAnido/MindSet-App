import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import deleteIcon from '../../assets/deleteIcon.png';

function Clients() {
  const [clients, saveClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      });
  }, []);

  const addClient = () => {
    window.location.href = `/clients/form`;
  };

  const deleteClient = () => {
    const url = `${process.env.REACT_APP_API}/clients/delete/${selectedId}`;
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
        saveClients(clients.filter((client) => client._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.msg));
      })
      .finally(() => setShowModal(false));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdClient = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deleteClient}
        selectedId={selectedId}
        titleText="Delete a client"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this client?'
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
          <tr>
            <th>Name</th>
            <th>Company Type</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              className={styles.clientRow}
              key={client._id}
              onClick={() => (window.location.href = `clients/form?id=${client._id}`)}
            >
              <td>{client.companyName}</td>
              <td>{client.companyType}</td>
              <td>{client.email}</td>
              <td>{client.country}</td>
              <td>{client.phone}</td>
              <td className={styles.deleteButtonTD}>
                <button
                  className={styles.deleteIcon}
                  onClick={(event) => handleIdClient(event, client._id)}
                >
                  <img src={deleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addClient}>
        ADD CLIENT
      </button>
    </section>
  );
}

export default Clients;
