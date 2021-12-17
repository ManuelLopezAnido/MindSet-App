import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, deleteClient } from '../../redux/clients/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from '../../redux/clients/actions';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const clients = useSelector((store) => store.clients.list);
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);

  useEffect(() => {
    if (!clients.length) {
      dispatch(getClients());
    }
  }, [clients]);

  const onDeleteClient = () => {
    dispatch(deleteClient(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdClient = (event, selectedId) => {
    event.stopPropagation();
    setSelectedId(selectedId);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onDeleteClient}
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
        showModal={error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Clients</h3>
        <Button onClick={() => history.push('/clients/form')} value="Client" />
      </div>
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
