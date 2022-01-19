import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import styles from './interviews.module.css';
import Modal from 'Components/Shared/Modal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import InputSearch from 'Components/Shared/InputSearch';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import EditButton from 'Components/Shared/EditButton';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { errorToDefault } from 'redux/interviews/actions';

const Interviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);
  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, [interviews]);

  const closeModal = () => {
    setShowModal(false);
  };

  const onClickDelete = () => {
    dispatch(deleteInterview(selectedId));
    setShowModal(false);
  };

  const handleIdInterview = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={listStyles.mainContainer}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={onClickDelete}
        selectedId={selectedId}
        titleText="Delete an interview"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this interview?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <Modal
        showModal={!!error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        spanObjectArray={[
          {
            span: error
          }
        ]}
        leftButtonText="OK"
        rightButtonText="CLOSE"
      />
      <div className={styles.inputSearch}>
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Client Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews
            .filter((interview) => {
              if (
                interview.positionId?.jobTitle
                  .toLowerCase()
                  .includes(inputSearchBar.toLowerCase()) ||
                interview.clientId?.clientName
                  .toLowerCase()
                  .includes(inputSearchBar.toLowerCase()) ||
                interview.state.toLowerCase().includes(inputSearchBar.toLowerCase())
              ) {
                return interview;
              }
            })
            .map((interview) => (
              <tr
                key={interview._id}
                onClick={() => {
                  window.location.replace(`interviews/form?id=${interview._id}`);
                }}
              >
                <td>{interview.positionId?.jobTitle}</td>
                <td>{interview.clientId?.clientName}</td>
                <td>{interview.date.substring(0, 10)}</td>
                <td>{interview.time}</td>
                <td>{interview.state}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      (window.location.href = `/admin/interviews/form?id=${interview._id}`)
                    }
                  />
                  <DeleteButton onClick={(event) => handleIdInterview(event, interview._id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Interviews;
