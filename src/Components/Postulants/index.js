import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import deleteImage from '../../assets/images/deleteIcon.png';
import Modal from '../Postulants/Modal';

const Postulants = () => {
  const [showModal, setShowModal] = useState(false);
  const [Postulants, setPostulants] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/postulants`)
      .then((response) => response.json())
      .then((response) => setPostulants(response))
      .catch((error) => console.log(error));
  }, []);

  // Esta func me lleva al form
  const onRowClick = (postulantId, event) => {
    event.stopPropagation();
    console.log(event);
    // window.location.href = `${window.location.pathname}/form?_id=${postulantId}`;
  };
  //Esta cierra el modal cambiando el state
  const closeModal = (event) => {
    console.log(event);
    event.preventDefault();
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <Modal showModal={showModal} closeModal={closeModal} />
      <div className={styles.content}>
        <h2 className={styles.header}>Postulants</h2>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableContent}>
            {Postulants.map((postulant) => {
              return (
                <tr key={postulant._id} onClick={(event) => onRowClick(postulant._id, event)}>
                  {/* puedo ver de agregar algo mas */}
                  <td>
                    <div>
                      {postulant?.firstName || '-'} {postulant?.lastName || '-'}
                    </div>
                  </td>
                  <td>
                    <div>{postulant?.country || '-'}</div>
                  </td>
                  <td>
                    <button type="button" onClick={() => setShowModal(true)}>
                      {/* ACA FALTA TODO EL LABURO DE BOTON */}
                      <img src={deleteImage} alt="logo"></img>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={styles.button} id="addClient" type="button">
          Add Postulant
        </button>
      </div>
    </div>
  );
};

export default Postulants;
