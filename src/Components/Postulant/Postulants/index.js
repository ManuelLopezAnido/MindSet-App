import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import locationIcon from 'assets/images/location.png';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import InputSearch from 'Components/Shared/InputSearch';
import { useSelector, useDispatch } from 'react-redux';
import { getPostulants, deletePostulant } from 'redux/postulants/thunks';
import { errorToDefault } from 'redux/postulants/actions';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');

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
    <div className={styles.mainContainer}>
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
      <div className={styles.inputSearch}>
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={styles.postulantList}>
        {postulants
          .filter((postulant) => {
            if (
              postulant.firstName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              postulant.lastName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              postulant.city?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              postulant.country?.toLowerCase().includes(inputSearchBar.toLowerCase())
            ) {
              return postulant;
            }
          })
          .map((postulant) => (
            <div className={styles.postulantContainer} key={postulant._id}>
              <div className={styles.imageCounselor}>
                <img
                  className={styles.logoCounselor}
                  src={
                    'http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg'
                  }
                />
              </div>
              <div>
                <div className={styles.title}>
                  <p>
                    {postulant.firstName} {postulant.latsName}
                  </p>
                  <DeleteButton onClick={(event) => handleIdPostulant(event, postulant._id)} />
                </div>
                <p className={styles.description}>{postulant.email}</p>
                <p className={styles.description}>{postulant.phone}</p>
                <div className={styles.footerContainer}>
                  <div className={styles.location}>
                    <img src={locationIcon} />
                    <p>
                      {postulant.city}, {postulant.country}
                    </p>
                  </div>
                  <button
                    onClick={() => (window.location.href = `postulants/form?id=${postulant._id}`)}
                    className={styles.button}
                    type="submit"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Postulants;
