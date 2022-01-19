import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import AddButton from 'Components/Shared/AddButton';
import InputSearch from 'Components/Shared/InputSearch';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import locationIcon from 'assets/images/location.png';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, deleteClient } from 'redux/clients/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/clients/actions';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const clients = useSelector((store) => store.clients.list);
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);

  useEffect(() => {
    if (!clients.list) {
      dispatch(getClients());
    }
  }, []);

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
    <section className={listStyles.mainContainer}>
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
      <div className={listStyles.headerList}>
        <AddButton onClick={() => history.push('/admin/clients/form')} value="Client" />
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={listStyles.containerList}>
        {clients
          .filter((client) => {
            if (
              client.clientName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              client.clientType?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              client.email?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              client.city?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              client.country?.toLowerCase().includes(inputSearchBar.toLowerCase())
            ) {
              return client;
            }
          })
          .map((client) => (
            <div className={listStyles.container} key={client._id}>
              <div className={listStyles.title}>
                <p> {client.clientName} </p>
                <DeleteButton onClick={(event) => handleIdClient(event, client._id)} />
              </div>
              <p className={listStyles.description}>{client.clientType}</p>
              <p className={listStyles.description}>{client.email}</p>
              <p className={listStyles.description}>{client.phone}</p>
              <div className={listStyles.footerContainer}>
                <div className={listStyles.location}>
                  <img src={locationIcon} />
                  <p>
                    {client.city}, {client.country}
                  </p>
                </div>
                <button
                  onClick={() => (window.location.href = `clients/form?id=${client._id}`)}
                  className={listStyles.buttonPlus}
                  type="submit"
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Clients;
