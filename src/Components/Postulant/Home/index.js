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
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Personal Information</p>
          <button className={styles.collapseButton} onClick={handlePersonalInformationData}>
            +
          </button>
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
          <button className={styles.collapseButton} onClick={handleAcademicInformationData}>
            +
          </button>
        </div>
        {openAcademicInformationData ? (
          <div className={styles.dataSection}>
            <div className={styles.informationRow}>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Elementary School</p>
                <p>{selectedPostulant.elementarySchool[0].name}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Degree</p>
                <p>{selectedPostulant.highSchool[0].degree}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Graduate Year</p>
                <p>{selectedPostulant.university[0].graduateYear}</p>
              </div>
            </div>
            <div className={styles.informationRow}>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>High School</p>
                <p>{selectedPostulant.highSchool[0].name}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Degree</p>
                <p>{selectedPostulant.highSchool[0].degree}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Graduate Year</p>
                <p>{selectedPostulant.highSchool[0].graduateYear}</p>
              </div>
            </div>
            <div className={styles.informationRow}>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>University</p>
                <p>{selectedPostulant.university[0].name}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Degree</p>
                <p>{selectedPostulant.university[0].degree}</p>
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Graduate Year</p>
                <p>{selectedPostulant.university[0].graduateYear}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Work Experience Information</p>
          <button className={styles.collapseButton} onClick={handleWorkExperienceData}>
            +
          </button>
        </div>
        {openWorkExperienceData ? (
          <div className={styles.dataSection}>
            <div className={styles.informationRow}>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Work Experience</p>
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <td className={styles.tableTitle}>Title</td>
                    <td className={styles.tableTitle}>Company</td>
                    <td className={styles.tableTitle}>Start</td>
                    <td className={styles.tableTitle}>End</td>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td>
                        <p>{selectedPostulant.workExperience[0].title}</p>
                      </td>
                      <td>
                        <p>{selectedPostulant.workExperience[0].company}</p>
                      </td>
                      <td>
                        <p>{selectedPostulant.workExperience[0].start}</p>
                      </td>
                      <td>
                        <p>{selectedPostulant.workExperience[0].end}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Data of Interest</p>
          <button className={styles.collapseButton} onClick={handleDataOfInterestData}>
            +
          </button>
        </div>
        {openDataOfInterestData ? (
          <div className={styles.dataSection}>
            <div className={styles.informationRow}>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Hobbies</p>
                {selectedPostulant.hobbies.map((hobbie) => {
                  return <p key={hobbie}>{hobbie}</p>;
                })}
              </div>
              <div className={styles.dataField}>
                <p className={styles.fieldName}>Languages</p>
                {selectedPostulant.languages.map((language) => {
                  return <p key={language}>{language}</p>;
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Home;
