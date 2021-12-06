import { useEffect, useState } from 'react';
import styles from './workProfiles.module.css';
import ModalWorkProfiles from './Modal/ModalWorkProfiles';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import deleteIcon from '../../assets/deleteIcon.png';

function WorkProfiles() {
  const [showModal, setShowModal] = useState(false);
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');
  const [workProfiles, saveWorkProfiles] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/workprofiles`)
      .then((response) => response.json())
      .then((response) => {
        saveWorkProfiles(response.workProfiles);
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
  }, []);

  const addWorkProfile = () => {
    window.location.href = `/workprofiles/form`;
  };

  const deleteWorkProfile = (id) => {
    const url = `${process.env.REACT_APP_API}/workprofiles/delete/${id}`;
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
      });
    closeModal();
    saveWorkProfiles(workProfiles.filter((workProfile) => workProfile._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
  };

  const handleWorkProfile = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  console.log('workProfiles', workProfiles);
  return (
    <section className={styles.container}>
      <ModalWorkProfiles
        show={showModal}
        closeModal={closeModal}
        deleteWorkProfile={deleteWorkProfile}
        selectedId={selectedId}
      />
      <ErrorMessage
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <h2>Profiles</h2>
      <table>
        <thead>
          <th>Name</th>
          <th>Description</th>
        </thead>
        <tbody>
          {workProfiles.map((workProfile) => (
            <tr
              className={styles.workProfileRow}
              key={workProfile._id}
              onClick={() => (window.location.href = `workprofiles/form?id=${workProfile._id}`)}
            >
              <td>{workProfile.name}</td>
              <td>{workProfile.description}</td>
              <td className={styles.deleteButtonTD}>
                <button
                  className={styles.deleteIcon}
                  onClick={(event) => handleWorkProfile(event, workProfile._id)}
                >
                  <img src={deleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addWorkProfile}>
        ADD PROFILE
      </button>
    </section>
  );
}

export default WorkProfiles;
