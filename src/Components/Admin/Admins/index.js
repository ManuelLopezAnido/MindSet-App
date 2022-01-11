import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import AddButton from 'Components/Shared/AddButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/admins/actions';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const admins = useSelector((store) => store.admins.list);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const errorMessage = useSelector((store) => store.admins.errorMessage);

  useEffect(() => {
    if (!admins.length) {
      dispatch(getAdmins());
    }
  }, [admins]);

  const onClickDelete = () => {
    dispatch(deleteAdmin(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdAdmin = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={listStyles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onClickDelete}
        selectedId={selectedId}
        titleText="Delete an Admin"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this admin?'
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
      <div className={listStyles.titleAndButton}>
        <h3>Admin</h3>
        <AddButton onClick={() => history.push('/admin/admins/form')} value="Admin" />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th> Email </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr
                key={admin._id}
                onClick={() => {
                  window.location.replace(`admins/form?id=${admin._id}`);
                }}
              >
                <td>{admin.email}</td>
                <td>
                  <DeleteButton onClick={(event) => handleIdAdmin(event, admin._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
