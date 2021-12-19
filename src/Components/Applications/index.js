import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import NoData from '../Shared/NoData';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications, deleteApplication } from '../../redux/applications/thunks.js';
import { errorToDefault } from '../../redux/admins/actions';

function Applications() {
  const [selectedId, setSelectedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState('');

  const dispatch = useDispatch();
  const listApplications = useSelector((store) => store.applications.list);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);

  useEffect(() => {
    dispatch(getApplications());
  }, []);

  useEffect(() => {
    setShowErrorModal(error);
  }, [error]);

  const addApplication = () => {
    window.location.href = `/applications/form`;
  };

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

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };

  if (isLoading) return <IsLoading />;
  return (
    <section className={styles.container}>
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
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Applications</h3>
        <Button onClick={addApplication} value="Applications" />
      </div>
      <NoData data={listApplications.lenght} />
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
          {listApplications.map((a) => (
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
