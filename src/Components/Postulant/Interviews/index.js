import styles from './interviews.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import { errorToDefault } from 'redux/admins/actions';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import ErrorModal from 'Components/Shared/ErrorModal';

const Interviews = () => {
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  const sessions = useSelector((store) => store.sessions.list);

  const Loading = useSelector((store) => store.sessions.isLoading);
  const errMessage = useSelector((store) => store.interviews.error);

  useEffect(() => {
    dispatch(getInterviews());
    dispatch(getSessions());
  }, []);

  const selectedPostulantId = sessionStorage.getItem('id');

  let filtredInterviews = interviews.filter((interview) => {
    return interview.postulantId === selectedPostulantId;
  });

  let filterSessionsWithOutPostulant = sessions.filter((session) => {
    return session.postulantId === undefined;
  });

  const OnClickDelete = (id) => {
    dispatch(deleteInterview(id));
  };
  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };

  let postulantHasSessions = false;
  let postulantHasSessionsAccomplished = true;
  let sessionDay, sessionTime;
  sessions.map((session) => {
    if (session.postulantId?._id === selectedPostulantId && session.accomplished) {
      postulantHasSessions = true;
    }
    if (session.postulantId?._id === selectedPostulantId && !session.accomplished) {
      postulantHasSessionsAccomplished = false;
      sessionDay = session.date;
      sessionTime = session.time;
    }
  });

  const selectedSession = (sessionId, postulantId, counselorId, date, time, accomplished) => {
    postulantHasSessionsAccomplished = false;
    const data = {
      postulantId: postulantId,
      counselorId: counselorId,
      date: date,
      time: time,
      accomplished: accomplished
    };
    dispatch(updateSession(sessionId, data));
    location.reload();
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
      {postulantHasSessions ? (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Client</th>
              <th>Date and Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtredInterviews.map((interview) => (
              <tr key={interview._id}>
                <td>{interview.jobTitle}</td>
                <td>{interview.clientId.clientName}</td>
                <td>{interview.time}</td>
                <td onClick={() => OnClickDelete(interview._id)}>delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {postulantHasSessionsAccomplished ? (
            <div>
              <p className={styles.titleBox}>
                Please choise a date for the Session with the Counselor
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Counselor Name</th>
                    <th>Day</th>
                    <th>Time</th>
                  </tr>
                </thead>
                {filterSessionsWithOutPostulant.map((session) => (
                  <tr
                    className={styles.counselorsList}
                    key={session._id}
                    onClick={() =>
                      selectedSession(
                        session._id,
                        selectedPostulantId,
                        session.counselorId,
                        session.date,
                        session.time,
                        session.accomplished
                      )
                    }
                  >
                    <td>{session.counselorId?.firstName + ' ' + session.counselorId?.lastName}</td>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <div>
              <h2>No interview available.</h2>
              <p>
                Interviews will be available once you finished your Session with the Counselor the
                day {sessionDay} at {sessionTime}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Interviews;
