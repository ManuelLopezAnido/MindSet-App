import { useEffect, useState } from 'react';
import styles from './councelors.module.css';
import Modal from '../Shared/Modal';
import Error from '../Councelors/Error';
import ErrorModal from '../Shared/ErrorModal';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

const Councelor = () => {
  const [councelors, saveCouncelors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/counselors`)
      .then((response) => response.json())
      .then((response) => {
        saveCouncelors(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      });
  }, []);

  const addCouncelor = () => {
    window.location.replace(`councelors/form`);
  };

  const deleteCouncelor = () => {
    const options = {
      method: 'DELETE'
    };
    const url = `${process.env.REACT_APP_API}/counselors/delete/${selectedId}`;
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        saveCouncelors(councelors.filter((councelor) => councelor._id !== selectedId));
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setShowModal(false));
  };

  const handleIdCouncelor = (event, id) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(id);
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
        actionEntity={deleteCouncelor}
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
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <div className={styles.titleAndButton}>
        <h3>Councelors</h3>
        <Button onClick={addCouncelor} value="Councelors" />
      </div>
      <table className={styles.list}>
        <thead>
          <tr>
            <th> First Name </th>
            <th> Last Name </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {councelors.map((councelor) => {
            return (
              <tr
                key={councelor._id}
                onClick={() => {
                  window.location.replace(`councelors/form?id=${councelor._id}`);
                }}
              >
                <td>{councelor.firstName}</td>
                <td>{councelor.lastName}</td>
                <td>
                  <DeleteButton onClick={(event) => handleIdCouncelor(event, councelor._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
export default Councelor;
