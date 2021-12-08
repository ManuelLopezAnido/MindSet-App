import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addApplication = () => {
    window.location.href = `/applications/form`;
  };

  const deleteApplication = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/applications/delete/${selectedId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 204 && res.status !== 200) {
          return res.json().then((ErrMessage) => {
            throw new Error(ErrMessage);
          });
        }
        setApplications(applications.filter((a) => a._id !== selectedId));
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

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdApplication = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
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
        actionEntity={deleteApplication}
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
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Applications</h3>
        <Button onClick={addApplication} value="Applications" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company </th>
            <th>Postulant</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr
              className={styles.applicationRow}
              key={a._id}
              onClick={() => (window.location.href = `applications/form?id=${a._id}`)}
            >
              <td>{a.positionId ? a.positionId.jobTitle : 'Not found position'}</td>
              <td>{a.companyId ? a.companyId.companyName : 'Not found company'}</td>
              <td>
                {a.postulantId
                  ? a.postulantId.firstName + ' ' + a.postulantId.lastName
                  : 'Not found postulant'}
              </td>
              <td>{a.applicationState}</td>
              <td className={styles.deleteButtonTD}>
                <DeleteButton onClick={(e) => handleIdApplication(e, a._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Applications;
