import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import ModalClient from './Modal/ModalClient';
import deleteIcon from '../../assets/deleteIcon.png';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [clients, saveClients] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response.data);
      });
  }, []);

  const addClient = () => {
    window.location.href = `/clients/form`;
  };

  const deleteClient = (id) => {
    const url = `${process.env.REACT_APP_API}/api/clients/delete/${id}`;
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
      .catch((error) => error);
    closeModal();
    saveClients(clients.filter((client) => client._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdClient = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <ModalClient
        show={showModal}
        closeModal={closeModal}
        deleteClient={deleteClient}
        selectedId={selectedId}
      />
      <h2>Clients</h2>
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
          {clients.map((client) => {
            return (
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
            );
          })}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addClient}>
        ADD CLIENT
      </button>
    </section>
  );
}

export default Clients;
