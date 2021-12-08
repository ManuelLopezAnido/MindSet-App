import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import ModalClient from './Modal/ModalClient';
import ErrorMessageModal from './ErrorMessageModal/ErrorMessageModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');
  const [clients, saveClients] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response.data);
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addClient = () => {
    window.location.href = `/clients/form`;
  };

  const deleteClient = (id) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/clients/delete/${id}`;
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
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
    closeModal();
    saveClients(clients.filter((client) => client._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
  };

  const handleIdClient = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <ModalClient
        show={showModal}
        closeModal={closeModal}
        deleteClient={deleteClient}
        selectedId={selectedId}
      />
      <ErrorMessageModal
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <div className={styles.titleAndButton}>
        <h3>Clients</h3>
        <Button onClick={addClient} value="Client" />
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Company Type</th>
          <th>Email</th>
          <th>Country</th>
          <th>Phone</th>
          <th>Actions</th>
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
              <td>
                <DeleteButton onClick={(event) => handleIdClient(event, client._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Clients;
