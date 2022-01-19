import { useEffect, useState } from 'react';
import styles from './application.module.css';
import listStyles from 'lists.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications, deleteApplication } from 'redux/applications/thunks.js';
import { addInterview } from 'redux/interviews/thunks.js';
import { errorToDefault } from 'redux/admins/actions';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Modal from 'Components/Shared/Modal';
import InputSearch from 'Components/Shared/InputSearch';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import ModalInterview from './modalInterview';

function Applications() {
  const [showModalInterview, setShowModalInterview] = useState(false);
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [positionId, setPositionId] = useState('');
  const [postIdSelected, setPostIdSelected] = useState('');
  const [clientId, setClientId] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const listApplications = useSelector((store) => store.applications.list);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);

  useEffect(() => {
    dispatch(getApplications());
  }, []);

  const clickDeleteApplication = () => {
    dispatch(deleteApplication(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdApplication = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };
  const makeAnInterview = (event, position, post, client, appId) => {
    event.stopPropagation();
    setShowModalInterview(true);
    setPositionId(position);
    setPostIdSelected(post);
    setClientId(client);
    setSelectedId(appId);
  };
  const loadInterview = (day, time, position, postulant, client, application) => {
    const newInterview = {
      positionId: position,
      postulantId: postulant,
      clientId: client,
      date: day,
      time: time,
      state: 'PENDING'
    };
    dispatch(addInterview(newInterview));
    dispatch(deleteApplication(application));
  };

  if (isLoading) return <IsLoading />;
  return (
    <section className={listStyles.mainContainer}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={clickDeleteApplication}
        selectedId={selectedId}
        titleText="Delete an application"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this application?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <Modal
        showModal={!!error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        spanObjectArray={[
          {
            span: error
          }
        ]}
        leftButtonText=""
        rightButtonText="Ok"
      />
      <ModalInterview
        show={showModalInterview}
        close={() => {
          setShowModalInterview(false);
        }}
        action={loadInterview}
        positionId={positionId}
        postId={postIdSelected}
        clientId={clientId}
        appId={selectedId}
      />
      <div className={styles.inputSearch}>
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Client </th>
            <th>Postulant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listApplications
            .filter((a) => {
              if (
                a.positionId?.jobTitle.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                a.postulantId?.firstName.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                a.postulantId?.lastName.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                a.clientId?.clientName.toLowerCase().includes(inputSearchBar.toLowerCase())
              ) {
                return a;
              }
            })
            .map((a) => (
              <tr key={a._id}>
                <td>{a.positionId ? a.positionId.jobTitle : 'Position not found'}</td>
                <td>{a.clientId ? a.clientId.clientName : 'Client not found'}</td>
                <td>
                  {a.postulantId
                    ? a.postulantId.firstName + ' ' + a.postulantId.lastName
                    : 'Postulant not found'}
                </td>
                <td>
                  <DeleteButton onClick={(e) => handleIdApplication(e, a._id)} />
                  <button
                    className={styles.button}
                    onClick={(e) =>
                      makeAnInterview(e, a.positionId._id, a.postulantId._id, a.clientId._id, a._id)
                    }
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default Applications;
