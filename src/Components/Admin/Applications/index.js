import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications, deleteApplication } from 'redux/applications/thunks.js';
import { errorToDefault } from 'redux/admins/actions';
import { useHistory } from 'react-router-dom';
import Modal from 'Components/Shared/Modal';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

function Applications() {
  const [selectedId, setSelectedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const listApplications = useSelector((store) => store.applications.list);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isLoading);

  console.log(listApplications);

  useEffect(() => {
    dispatch(getApplications());
  }, []);

  useEffect(() => {
    setShowErrorModal(error);
  }, [error]);

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
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <div className={listStyles.list}>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Client </th>
              <th>Postulant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listApplications.map((a) => (
              <tr key={a._id}>
                <td>{a.positionId ? a.positionId.jobTitle : 'Position not found'}</td>
                <td>{a.clientId ? a.clientId.clientName : 'Client not found'}</td>
                <td>
                  {a.postulantId
                    ? a.postulantId.firstName + ' ' + a.postulantId.lastName
                    : 'Postulant not found'}
                </td>
                <td>
                  <DeleteButton onClick={(event) => handleIdApplication(event, a._id)} />
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/interviews/form?postulantId=${a.postulantId._id}&clientId=${a.clientId._id}&position=${a.positionId?.jobTitle}`)
                    }
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Applications;
