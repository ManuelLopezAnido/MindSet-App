import { useEffect, useState } from 'react';
import styles from './clients.module.css';

function Clients() {
  const [clients, saveClients] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        saveClients(response.data);
      });
  }, []);

  const deleteClient = (id) => {
    const url = `${process.env.REACT_APP_API}/api/clients/delete/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
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
      saveClients(clients.filter((client) => client._id !== id));
  };

  const addClient = () =>{
    window.location.href = `/clients/form`;
  };

  return (
    <section className={styles.container}>
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
              <tr key={client._id}>
                <td>
                  <a className={styles.clientLink} href={`clients/form?id=${client._id}`}>{client.companyName}</a>
                </td>
                <td>{client.companyType}</td>
                <td>{client.email}</td>
                <td>{client.country}</td>
                <td>{client.phone}</td>
                <td>
                  <button onClick={() => deleteClient(client._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={addClient}>ADD CLIENT</button>
    </section>
  );
}

export default Clients;
