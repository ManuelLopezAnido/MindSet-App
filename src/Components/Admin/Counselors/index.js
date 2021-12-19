import { useEffect, useState } from 'react';
import styles from './counselors.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getCounselors, deleteCounselor } from 'redux/counselors/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/counselors/actions';

const Counselor = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();

  const counselors = useSelector((store) => store.counselors.list);
  const isLoading = useSelector((store) => store.counselors.isLoading);
  const error = useSelector((store) => store.counselors.error);
  const errorMessage = useSelector((store) => store.counselors.errorMessage);

  useEffect(() => {
    if (!counselors.length) {
      dispatch(getCounselors());
    }
  }, [counselors]);

  const onClickDelete = () => {
    dispatch(deleteCounselor(selectedId));
    setShowModal(false);
  };

  const handleIdCounselor = (event, id) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onClickDelete}
        selectedId={selectedId}
        titleText="Delete a counselor"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this counselor?'
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
      <div className={styles.titleAndButton}>
        <h3>Counselors</h3>
        <Button onClick={() => history.push('/admin/counselors/form')} value="Counselor" />
      </div>
      <table className={styles.list}>
        <thead>
          <tr>
            <th> First Name </th>
            <th> Last Name </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {counselors.map((counselor) => {
            return (
              <tr
                key={counselor._id}
                onClick={() => {
                  window.location.replace(`counselors/form?id=${counselor._id}`);
                }}
              >
                <td>{counselor.firstName}</td>
                <td>{counselor.lastName}</td>
                <td>
                  <DeleteButton onClick={(event) => handleIdCounselor(event, counselor._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
export default Counselor;