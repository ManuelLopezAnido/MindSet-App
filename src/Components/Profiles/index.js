import { useEffect, useState } from 'react';
import styles from './workProfiles.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function WorkProfiles() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [workProfiles, saveWorkProfiles] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/workprofiles`)
      .then((response) => response.json())
      .then((response) => {
        saveWorkProfiles(response.workProfiles);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addWorkProfile = () => {
    window.location.href = `/workprofiles/form`;
  };

  const deleteWorkProfile = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/workprofiles/delete/${selectedId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if ((res.status !== 204) & (res.status !== 200)) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        saveWorkProfiles(workProfiles.filter((workProfile) => workProfile._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const handleWorkProfile = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deleteWorkProfile}
        selectedId={selectedId}
        titleText="Delete a profile"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this profile?'
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
      <div className={styles.titleAndButton}>
        <h3>Profiles</h3>
        <Button onClick={addWorkProfile} value="Profile" />
      </div>
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
                <DeleteButton onClick={(event) => handleWorkProfile(event, workProfile._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default WorkProfiles;
