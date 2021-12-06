import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import deleteIcon from '../../assets/deleteIcon.png';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPositions(response);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      });
  }, []);

  const addPositions = () => {
    window.location.href = `/positions/form`;
  };

  const deletePosition = () => {
    const url = `${process.env.REACT_APP_API}/positions/delete/${selectedId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 204 && res.status !== 200) {
          return res.json().then((ErrMessage) => {
            throw new Error(ErrMessage);
          });
        }
        setPositions(positions.filter((a) => a._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setShowModal(false));
  };

  const handleIdPosition = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deletePosition}
        selectedId={selectedId}
        titleText="Delete a position"
        spanObjectArray={[
          {
            span: 'are you sure you want to delete this position?'
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
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Job</th>
            <th>Company </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((a) => (
            <tr
              className={styles.positionRow}
              key={a._id}
              onClick={() => (window.location.href = `positions/form?id=${a._id}`)}
            >
              <td>{a.jobTitle}</td>
              <td>{a.companyName}</td>
              <td>{a.jobDescription}</td>
              <td className={styles.deleteButtonTD}>
                <button className={styles.deleteIcon} onClick={(e) => handleIdPosition(e, a._id)}>
                  <img src={deleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addPositions}>
        ADD APPLICATION
      </button>
    </section>
  );
}

export default Positions;
