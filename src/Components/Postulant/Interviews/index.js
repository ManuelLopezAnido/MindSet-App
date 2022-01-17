import styles from './interviews.module.css';
import listStyles from 'lists.module.css';
import { useEffect, useState } from 'react';
import Modal from 'Components/Shared/Modal';
import InputSearch from 'Components/Shared/InputSearch';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import { errorToDefault } from 'redux/admins/actions';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import ErrorModal from 'Components/Shared/ErrorModal';
import ModalInfo from 'Components/Shared/ModalInfo';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import VisualizeButton from 'Components/Shared/VisualizeButton';

const Interviews = () => {
  const dispatch = useDispatch();
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [inputSearchBar, setInputSearchBar] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [job, setJob] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const interviews = useSelector((store) => store.interviews.list);
  const sessions = useSelector((store) => store.sessions.list);
  const Loading = useSelector((store) => store.sessions.isLoading);
  const errMessage = useSelector((store) => store.interviews.error);

  useEffect(() => {
    dispatch(getInterviews());
    dispatch(getSessions());
  }, []);

  const selectedPostulantId = '61a4398da318de40f22eba2c';

  let filtredInterviews = interviews.filter((interview) => {
    return interview.postulantId === selectedPostulantId;
  });

  let filterSessionsWithOutPostulant = sessions.filter((session) => {
    return session.postulantId === undefined;
  });

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };

  const OnClickDeleteInterview = () => {
    setShowModal(false);
    dispatch(deleteInterview(selectedId));
  };

  const handleIdInterview = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
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

  const closeModal = () => {
    setShowModal(false);
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
    <div className={listStyles.mainContainer}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={OnClickDeleteInterview}
        selectedId={selectedId}
        titleText="Delete a Interview"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this Interview?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={errMessage}
        middleText={errMessage}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <ModalInfo
        showModal={showModalInfo}
        closeModal={closeModalInfo}
        title1={'Job'}
        title2={'Company'}
        title3={'Date'}
        title4={'Time'}
        text1={job}
        text2={company}
        text3={date}
        text4={time}
      />
      {postulantHasSessions ? (
        <div className={styles.mainContainer}>
          <div className={styles.inputSearch}>
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
                  <th>Job Title</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Hour</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtredInterviews
                  .filter((interview) => {
                    if (
                      interview.jobTitle?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                      interview.clientName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                      interview.date?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                      interview.time?.toLowerCase().includes(inputSearchBar.toLowerCase())
                    ) {
                      return interview;
                    }
                  })
                  .map((interview) => (
                    <tr key={interview._id}>
                      <td>{interview.jobTitle}</td>
                      <td>{interview.clientName}</td>
                      <td>{interview.date}</td>
                      <td>{interview.time}</td>
                      <td>
                        <DeleteButton
                          onClick={(event) => handleIdInterview(event, interview._id)}
                        />
                        <VisualizeButton
                          onClick={() =>
                            Visualize(
                              interview.jobTitle,
                              interview.clientName,
                              interview.time,
                              interview.date
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {postulantHasSessionsAccomplished ? (
            <div className={styles.chooseSession}>
              <h2>Please choose a date for the Session with the Counselor</h2>
              <div className={listStyles.list}>
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
                      <td>{session.counselorId.firstName + ' ' + session.counselorId.lastName}</td>
                      <td>{session.date}</td>
                      <td>{session.time}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.noInterview}>
              <h2>No interviews available</h2>
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
