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

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <div>
        {clients.map((client) => {
          return <div key={client._id}>{client.email}</div>;
        })}
      </div>
    </section>
  );
}

export default Clients;
