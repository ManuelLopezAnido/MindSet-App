import styles from './home.module.css';
import { useState } from 'react';

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

  return (
    <section className={styles.home}>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Personal Information</p>
          <button onClick={handlePersonalInformationData}>+</button>
        </div>
        {openPersonalInformationData ? (
          <div className={styles.dataSection}>
            <div className={styles.dataField}>
              <p>Name</p>
              <p>Juan Alberto</p>
            </div>
            <div className={styles.dataField}>
              <p>Last Name</p>
              <p>Mateyko</p>
            </div>
            <div className={styles.dataField}>
              <p>Email</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Phone</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Date of Birth</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Gender</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Adress</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>City</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Postal Code</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Country</p>
              <p></p>
            </div>
            <div className={styles.dataField}>
              <p>Abount Me</p>
              <p></p>
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
