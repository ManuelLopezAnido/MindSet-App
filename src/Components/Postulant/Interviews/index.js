import styles from './interviews.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { errorToDefault } from 'redux/admins/actions';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import ErrorModal from 'Components/Shared/ErrorModal';

const Interviews = () => {
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  const Loading = useSelector((store) => store.interviews.isLoading);
  const errMessage = useSelector((store) => store.interviews.error);
  useEffect(() => {
    dispatch(getInterviews());
  }, []);
  const selectedPostulantId = '61a4398da318de40f22eba2c';
  let filtredInterviews = interviews.filter((interview) => {
    return interview.postulantId === selectedPostulantId;
  });
  const OnClickDelete = (id) => {
    dispatch(deleteInterview(id));
  };
  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };
  if (Loading) {
    return <IsLoading />;
  }
  return (
    <div className={styles.interviews}>
      <ErrorModal
        showModal={errMessage}
        middleText={errMessage}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <h2> News Interviews</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Date and Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtredInterviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.jobTitle}</td>
              <td>{interview.companyName}</td>
              <td>{interview.time}</td>
              <td onClick={() => OnClickDelete(interview._id)}>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Interviews;
