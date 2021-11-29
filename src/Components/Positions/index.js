import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import ModalPositons from './Modal/modalPositions.js';
import deleteIcon from '../../assets/deleteIcon.png';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/positions`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPositions(response);
      });
  }, []);
  console.log(`${process.env.REACT_APP_API}/api/positions`);
  console.log("datass: ", positions);

  const addPositions = () =>{
    window.location.href = `/positions/form`;
  };

  const deletePosition = (idPos) => {
    const url = `${process.env.REACT_APP_API}/api/positions/delete/${idPos}`;
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
      //  return;
      })
      .catch((error) => error);
      closeModal();
      setPositions(positions.filter((a) => a._id !== idPos));
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleIdPosition = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <ModalPositons 
        show={showModal} 
        closeModal={closeModal} 
        delete={deletePosition} 
        selectedId={selectedId}
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
          {
            positions.map((a) => { 
              return( 
                <tr className={styles.positionRow} key={a._id} onClick={()=> window.location.href = `positions/form?id=${a._id}`}>
                  <td>{a.jobTitle}</td>
                  <td>{a.companyName}</td>
                  <td>{a.jobDescription}</td>
                  <td className={styles.deleteButtonTD}>
                    <button className={styles.deleteIcon} onClick={(e) => handleIdPosition(e, a._id)}>
                      <img src={deleteIcon}/>
                    </button>
                  </td>
                </tr>);
            })
          }
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addPositions}>ADD APPLLICATION</button>
    </section>
  );
}

export default Positions;