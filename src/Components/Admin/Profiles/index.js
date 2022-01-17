import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import styles from './workProfiles.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import AddButton from 'Components/Shared/AddButton';
import EditButton from 'Components/Shared/EditButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles, deleteProfile } from 'redux/profiles/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/profiles/actions';

function WorkProfiles() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.profiles.list);
  const isLoading = useSelector((store) => store.profiles.isLoading);
  const error = useSelector((store) => store.profiles.error);
  const errorMessage = useSelector((store) => store.profiles.errorMessage);

  useEffect(() => {
    if (!profiles.length) {
      dispatch(getProfiles());
    }
  }, [profiles]);

  const onClickDelete = () => {
    dispatch(deleteProfile(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdProfile = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <section className={listStyles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onClickDelete}
        selectedId={selectedId}
        titleText="Delete a Profile"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this profile?'
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
      <div className={styles.addContainer}>
        <AddButton onClick={() => history.push('/admin/workprofiles/form')} value="Profile" />
      </div>
      <div className={listStyles.list}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((workProfile) => (
              <tr key={workProfile._id}>
                <td>{workProfile.name}</td>
                <td>{workProfile.description}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      (window.location.href = `/admin/workprofiles/form?id=${workProfile._id}`)
                    }
                  />
                  <DeleteButton onClick={(event) => handleIdProfile(event, workProfile._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WorkProfiles;
