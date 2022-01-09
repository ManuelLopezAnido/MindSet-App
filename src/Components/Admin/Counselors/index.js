import { useEffect, useState } from 'react';
import styles from './counselors.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
//import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getCounselors, deleteCounselor } from 'redux/counselors/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/counselors/actions';

const Counselor = () => {
  const [showModal, setShowModal] = useState(false);
  //const [selectedId, setSelectedId] = useState('');
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

  /*const onClickDelete = () => {
    dispatch(deleteCounselor(selectedId));
    setShowModal(false);
  };

 /* const handleIdCounselor = (event, id) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(id);
  };*/

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.mainContainer}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        //actionEntity={onClickDelete}
        //selectedId={selectedId}
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
      <div>
        <Button onClick={() => history.push('/admin/counselors/form')} value="Counselor" />
      </div>
      <div className={styles.counselorsList}>
        {counselors.map((counselor) => (
          <div className={styles.counselorContainer} key={counselor._id}>
            <p className={styles.title}>
              {counselor.firstName} {counselor.lastName}
            </p>
            <p className={styles.description}>{counselor.email}</p>
            <p className={styles.description}>{counselor.phone}</p>
            <div className={styles.footerContainer}>
              <p className={styles.location}>
                {counselor.city}, {counselor.country}
              </p>
              <button className={styles.buttonShow} type="submit">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Counselor;
