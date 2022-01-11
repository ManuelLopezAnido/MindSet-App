import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/AddButton';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';

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
    window.location.href = `/admin/interviews/form`;
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
    <section className={listStyles.container}>
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
      <div className={listStyles.titleAndButton}>
        <h3>Interviews</h3>
        <Button onClick={addInterview} value="Interview" />
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
          {interviews.map((interview) => (
            <tr
              key={interview._id}
              onClick={() => (window.location.href = `/admin/interviews/form?id=${interview._id}`)}
            >
              <td>{interview.jobTitle}</td>
              <td>{interview.clientName}</td>
              <td>{interview.date.substring(0, 10)}</td>
              <td>{interview.time}</td>
              <td>{interview.state}</td>
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
