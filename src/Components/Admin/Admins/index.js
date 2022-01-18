import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import EditButton from 'Components/Shared/EditButton';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import InputSearch from 'Components/Shared/InputSearch';
import AddButton from 'Components/Shared/AddButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/admins/actions';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const admins = useSelector((store) => store.admins.list);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const errorMessage = useSelector((store) => store.admins.errorMessage);

  useEffect(() => {
    if (!admins.list) {
      dispatch(getAdmins());
    }
  }, []);

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
    <div className={listStyles.mainContainer}>
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
      <Modal
        showModal={error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        spanObjectArray={[
          {
            span: errorMessage
          }
        ]}
        leftButtonText=""
        rightButtonText="Ok"
      />
      <div className={listStyles.headerList}>
        <AddButton onClick={() => history.push('/admin/admins/form')} value="Admin" />
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={listStyles.list}>
        <table>
          <thead>
            <tr>
              <th> Email </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {admins
              .filter((admin) => {
                if (admin.email?.toLowerCase().includes(inputSearchBar.toLowerCase())) {
                  return admin;
                }
              })
              .map((admin) => {
                return (
                  <tr
                    key={admin._id}
                    onClick={() => {
                      window.location.replace(`admins/form?id=${admin._id}`);
                    }}
                  >
                    <td>{admin.email}</td>
                    <td>
                      <EditButton
                        onClick={() =>
                          (window.location.href = `/admin/admins/form?id=${admin._id}`)
                        }
                      />
                      <DeleteButton onClick={(event) => handleIdAdmin(event, admin._id)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th> Email </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin) => {
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
