import { useEffect, useState } from 'react';
import styles from './councelors.module.css';
import Modal from '../Councelors/Modal';
import Error from '../Councelors/Error';
import ErrorMessage from '../Councelors/ErrorMessage';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';

const Councelor = () => {
  const [councelors, saveCouncelors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/counselors`)
      .then((response) => response.json())
      .then((response) => {
        saveCouncelors(response.data);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addCouncelor = () => {
    window.location.replace(`councelors/form`);
  };

  const deleteCouncelor = (id) => {
    setIsLoading(true);
    const options = {
      method: 'DELETE'
    };
    const url = `${process.env.REACT_APP_API}/counselors/delete/${id}`;
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        saveCouncelors(councelors.filter((councelor) => councelor._id !== id));
        setShowModal(false);
      })
      .catch((error) => {
        setShowErrorMessage(true);
        setErrorMessageText(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  };

  const onShowModal = (id, event) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeError = () => {
    setShowErrorMessage(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        id={selectedId}
        delete={deleteCouncelor}
        text="Are you sure you want to delete the counselor selected?"
      ></Modal>
      <ErrorMessage show={showErrorMessage} close={closeError} text={errorMessageText} />
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
                  <DeleteButton onClick={(event) => onShowModal(councelor._id, event)} />
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
