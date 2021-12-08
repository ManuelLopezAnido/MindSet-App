import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import ModalApplications from './Modal/ModalApplications.js';
import IsLoading from '../Shared/IsLoading/IsLoading';
import ErrorMessage from '../Councelors/ErrorMessage';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addApplication = () => {
    window.location.href = `/applications/form`;
  };

  const deleteApplication = (idApp) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/applications/delete/${idApp}`;
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
        closeModal();
        setApplications(applications.filter((a) => a._id !== idApp));
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeError = () => {
    setShowErrorMessage(false);
  };

  const handleIdApplication = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <ModalApplications
        show={showModal}
        closeModal={closeModal}
        delete={deleteApplication}
        selectedId={selectedId}
      />
      <ErrorMessage show={showErrorMessage} close={closeError} text={errorMessageText} />
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
