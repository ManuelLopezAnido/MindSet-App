import styles from './interviews.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { errorToDefault } from 'redux/admins/actions';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import ErrorModal from 'Components/Shared/ErrorModal';
import ModalInfo from 'Components/Shared/ModalInfo';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import VisualizeButton from 'Components/Shared/VisualizeButton';

const Interviews = () => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [job, setJob] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
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

  const Visualize = (job, company, time, date) => {
    setShowModalInfo(true);
    setJob(job);
    setCompany(company);
    setTime(time);
    setDate(date);
  };

  const closeModalInfo = () => {
    setShowModalInfo(false);
  };

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };
  if (Loading) {
    return <IsLoading />;
  }
  return (
    <div className={styles.interviews}>
      <ModalInfo
        showModal={showModalInfo}
        closeModal={closeModalInfo}
        job={job}
        time={time}
        date={date}
        company={company}
      />
      <ErrorModal
        showModal={errMessage}
        middleText={errMessage}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Client</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtredInterviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.jobTitle}</td>
              <td>{interview.clientName}</td>
              <td>{interview.date}</td>
              <td>{interview.time}</td>
              <td>{interview.state}</td>
              <td>
                <VisualizeButton
                  onClick={() =>
                    Visualize(
                      interview.jobTitle,
                      interview.clientName,
                      interview.time,
                      interview.date,
                      interview.state
                    )
                  }
                />
                <DeleteButton onClick={() => OnClickDelete(interview._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Interviews;
