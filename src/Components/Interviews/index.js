import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, saveInterviews] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addInterview = () => {
    window.location.href = `/interviews/form`;
  };

  const deleteInterview = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/interviews/delete/${selectedId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if ((res.status !== 204) & (res.status !== 200)) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        saveInterviews(interviews.filter((interview) => interview._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  const handleIdInterview = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deleteInterview}
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
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Interviews</h3>
        <Button onClick={addInterview} value="Interview" />
      </div>
      <table className={styles.list}>
        <thead>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Date</th>
          <th>Time</th>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr
              className={styles.interviewRow}
              key={interview._id}
              onClick={() => (window.location.href = `interviews/form?id=${interview._id}`)}
            >
              <td>{interview.jobTitle}</td>
              <td>{interview.companyName}</td>
              <td>{interview.date.substring(0, 10)}</td>
              <td>{interview.time}</td>
              <td>
                <DeleteButton onClick={(event) => handleIdInterview(event, interview._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Interviews;
