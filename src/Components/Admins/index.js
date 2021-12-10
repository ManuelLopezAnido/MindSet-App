import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Error from '../Admins/Error';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../redux/admins/thunks';

const Admins = () => {
  const dispatch = useDispatch();
  // const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const admins = useSelector((store) => store.admins.list);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const selectedAdmin = useSelector((store) => store.admins.selected);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const addAdmin = () => {
    window.location.replace(`admins/form`);
  };

  const onClickDelete = () => {
    console.log(selectedId);
    dispatch(deleteAdmin(selectedId - 1));
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

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.container}>
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
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Admin</h3>
        <Button onClick={addAdmin} value="Admin" />
      </div>
      <table className={styles.list}>
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
