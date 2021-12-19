import styles from './home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/postulants/thunks';

function Home() {
  const [openPersonalInformationData, setOpenPersonalInformationData] = useState(false);
  const [openAcademicInformationData, setAcademicInformationData] = useState(false);
  const [openWorkExperienceData, setWorkExperienceData] = useState(false);
  const [openDataOfInterestData, setDataOfInterestData] = useState(false);

  const handlePersonalInformationData = () => {
    setOpenPersonalInformationData(!openPersonalInformationData);
  };

  const handleAcademicInformationData = () => {
    setAcademicInformationData(!openAcademicInformationData);
  };

  const handleWorkExperienceData = () => {
    setWorkExperienceData(!openWorkExperienceData);
  };

  const handleDataOfInterestData = () => {
    setDataOfInterestData(!openDataOfInterestData);
  };

  const dispatch = useDispatch();
  const selectedPostulant = useSelector((store) => store.postulants.selected);
  const postulantId = '61a4398da318de40f22eba2c';

  useEffect(() => {
    dispatch(getOnePostulant(postulantId));
  }, []);

  return (
    <section className={styles.home}>
      {console.log(selectedPostulant)}
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Personal Information</p>
          <button onClick={handlePersonalInformationData}>+</button>
        </div>
        {openPersonalInformationData ? (
          <div className={styles.dataSection}>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Name</p>
              <p>{selectedPostulant.firstName}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Last Name</p>
              <p>{selectedPostulant.lastName}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Email</p>
              <p>{selectedPostulant.email}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Phone</p>
              <p>{selectedPostulant.phone}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Date of Birth</p>
              <p>{selectedPostulant.dateOfBirth}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Gender</p>
              <p>{selectedPostulant.gender}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Address</p>
              <p>???</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>City</p>
              <p>{selectedPostulant.city}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Postal Code</p>
              <p>????</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Country</p>
              <p>{selectedPostulant.country}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Abount Me</p>
              <p>????</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Academic Information</p>
          <button onClick={handleAcademicInformationData}>+</button>
        </div>
        {openAcademicInformationData ? <div>Holis aca iria toda la data....</div> : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Work Experience Information</p>
          <button onClick={handleWorkExperienceData}>+</button>
        </div>
        {openWorkExperienceData ? <div>Holis aca iria toda la data....</div> : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Data of Interest</p>
          <button onClick={handleDataOfInterestData}>+</button>
        </div>
        {openDataOfInterestData ? <div>Holis aca iria toda la data....</div> : null}
      </div>
    </section>
  );
}

export default Home;
