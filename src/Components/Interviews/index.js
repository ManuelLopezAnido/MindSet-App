import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import ModalInterview from './Modal/ModalInterview';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import deleteIcon from '../../assets/images/delete-icon.png';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [showModalMessageError, setShowModalMessageError] = useState(false);
  const [showModalMessageErrorMessage, setShowModalMessageErrorMessage] = useState('');
  const [interviews, saveInterviews] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response);
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
  }, []);

  const addInterview = () => {
    window.location.href = `/interviews/form`;
  };

  const deleteInterview = (id) => {
    const url = `${process.env.REACT_APP_API}/interviews/delete/${id}`;
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
        return;
      })
      .catch((error) => {
        setShowModalMessageError(true);
        setShowModalMessageErrorMessage(JSON.stringify(error.message));
      });
    closeModal();
    saveInterviews(interviews.filter((interview) => interview._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalMessageError = () => {
    setShowModalMessageErrorMessage(false);
  };

  const handleIdInterview = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <ModalInterview
        show={showModal}
        closeModal={closeModal}
        deleteInterview={deleteInterview}
        selectedId={selectedId}
      />
      <ErrorMessage
        show={showModalMessageError}
        closeModalMessageError={closeModalMessageError}
        setShowModalMessageError={setShowModalMessageError}
        showModalMessageErrorMessage={showModalMessageErrorMessage}
      />
      <h2>Interviews</h2>
      <table>
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
              <td className={styles.deleteButtonTD}>
                <button
                  className={styles.deleteIcon}
                  onClick={(event) => handleIdInterview(event, interview._id)}
                >
                  <img src={deleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addInterview}>
        ADD INTERVIEW
      </button>
    </section>
  );
}

export default Interviews;
