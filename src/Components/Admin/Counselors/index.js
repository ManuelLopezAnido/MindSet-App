import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import locationIcon from 'assets/images/location.png';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import InputSearch from 'Components/Shared/InputSearch';
import AddButton from 'Components/Shared/AddButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import { useSelector, useDispatch } from 'react-redux';
import { getCounselors, deleteCounselor } from 'redux/counselors/thunks';
import { useHistory } from 'react-router-dom';
import { errorToDefault } from 'redux/counselors/actions';

const Counselor = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');
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
    <section className={listStyles.mainContainer}>
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
      <div className={listStyles.headerList}>
        <AddButton onClick={() => history.push('/admin/counselors/form')} value="Counselor" />
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={listStyles.containerList}>
        {counselors
          .filter((counselor) => {
            if (
              counselor.firstName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              counselor.lastName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              counselor.email?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              counselor.city?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              counselor.country?.toLowerCase().includes(inputSearchBar.toLowerCase())
            ) {
              return counselor;
            }
          })
          .map((counselor) => (
            <div className={listStyles.container} key={counselor._id}>
              <div className={listStyles.title}>
                <p>
                  {counselor.firstName} {counselor.lastName}
                </p>
                <DeleteButton onClick={(event) => handleIdCounselor(event, counselor._id)} />
              </div>
              <p className={listStyles.description}>{counselor.email}</p>
              <p className={listStyles.description}>{counselor.phone}</p>
              <div className={listStyles.footerContainer}>
                <div className={listStyles.location}>
                  <img src={locationIcon} />
                  <p>
                    {counselor.city}, {counselor.country}
                  </p>
                </div>
                <button
                  onClick={() => (window.location.href = `counselors/form?id=${counselor._id}`)}
                  className={listStyles.buttonPlus}
                  type="submit"
                >
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
