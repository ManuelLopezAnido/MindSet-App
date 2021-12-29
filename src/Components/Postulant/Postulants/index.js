import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => setPostulants(response))
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const redirectToForm = (postulantId) => {
    postulantId
      ? (window.location.href = `${window.location.pathname}/form?_id=${postulantId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const deletePostulant = () => {
    const url = `${process.env.REACT_APP_API}/postulants/delete/${selectedId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        setPostulants(postulants.filter((postulants) => postulants._id !== selectedId));
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

  const handleIdPostulant = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={listStyles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={deletePostulant}
        selectedId={selectedId}
        titleText="Delete a postulant"
        leftButtonText="delete"
        rightButtonText="cancel"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this postulant'
          }
        ]}
      />
      <ErrorModal
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <div className={listStyles.titleAndButton}>
        <h3>Postulants</h3>
        <Button value="Postulant" onClick={() => redirectToForm(null)} />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => (
            <tr key={postulant._id} onClick={() => redirectToForm(postulant._id)}>
              <td>
                <div>
                  {postulant?.firstName || '-'} {postulant?.lastName || '-'}
                </div>
              </td>
              <td>
                <div>{postulant?.country || '-'}</div>
              </td>
              <td>
                <DeleteButton onClick={(event) => handleIdPostulant(event, postulant._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Postulants;
