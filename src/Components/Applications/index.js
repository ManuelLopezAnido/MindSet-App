import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import ModalApplications from './Modal/ModalApplications.js';
import deleteIcon from '../../assets/deleteIcon.png';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      });
  }, []);
  console.log("datass: ", applications);

  const addApplication = () =>{
    window.location.href = `/applications/form`;
  };

  const deleteApplication = (idApp) => {
    const url = `${process.env.REACT_APP_API}/api/applications/delete/${idApp}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 204 && res.status !== 200) {
          return res.json().then((ErrMessage) => {
            throw new Error(ErrMessage);
          });
        }
        return;
      })
      .catch((error) => error);
      closeModal();
      setApplications(applications.filter((a) => a._id !== idApp));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIdApplication = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <ModalApplications 
        show={showModal} 
        closeModal={closeModal} 
        delete={deleteApplication} 
        selectedId={selectedId}
      />
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>  
            <th>Position</th>
            <th>Company </th>
            <th>Postulant</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {
            applications.map((a) => { 
              return( 
                <tr className={styles.applicationRow} key={a._id} onClick={()=> window.location.href = `applications/form?id=${a._id}`}>
                  <td>{a.positionId}</td>
                  <td>{a.companyId}</td>
                  <td>{a.postulantId}</td>
                  <td>{a.applicationState}</td>
                  <td className={styles.deleteButtonTD}>
                    <button className={styles.deleteIcon} onClick={(e) => handleIdApplication(e, a._id)}>
                      <img src={deleteIcon}/>
                    </button>
                  </td>
                </tr>);
            })
          }
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addApplication}>ADD APPLLICATION</button>
    </section>
  );
}

export default Applications;