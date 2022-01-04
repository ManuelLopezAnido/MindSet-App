import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getPostulants, deletePostulant } from 'redux/postulants/thunks';
import { errorToDefault } from 'redux/postulants/actions';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const dispatch = useDispatch();

  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const error = useSelector((store) => store.postulants.error);
  const errorMessage = useSelector((store) => store.postulants.errorMessage);

  useEffect(() => {
    if (!postulants.length) {
      dispatch(getPostulants());
    }
  }, [postulants]);

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const onDeletePostulant = () => {
    dispatch(deletePostulant(selectedId));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdPostulant = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={listStyles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onDeletePostulant}
        selectedId={selectedId}
        titleText="Delete a postulant"
        leftButtonText="delete"
        rightButtonText="cancel"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this postulant'
          }
        ]}
      />
      <ErrorModal
        showModal={error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <div className={listStyles.titleAndButton}>
        <h3>Postulants</h3>
        <Button value="Postulant" onClick={() => redirectToForm(null)} />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => (
            <tr key={postulant._id} onClick={() => redirectToForm(postulant._id)}>
              <td>
                <div>
                  {postulant?.firstName || '-'} {postulant?.lastName || '-'}
                </div>
              </td>
              <td>
                <div>{postulant?.country || '-'}</div>
              </td>
              <td>
                <DeleteButton onClick={(event) => handleIdPostulant(event, postulant._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Postulants;
