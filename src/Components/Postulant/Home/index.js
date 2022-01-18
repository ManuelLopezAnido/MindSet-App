import styles from './home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/postulants/thunks';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import EditButton from 'Components/Shared/EditButton';

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

  useEffect(() => {
    dispatch(getOnePostulant(postulantId));
  }, []);

  const dispatch = useDispatch();
  const postulantId = '61a4398da318de40f22eba2c';
  const selectedPostulant = useSelector((store) => store.postulants.selected);
  const isLoading = useSelector((store) => store.postulants.isLoading);

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <section className={styles.home}>
      <div className={styles.postulantResume}>
        <div className={styles.imagePostulant}>
          <img
            className={styles.logoPostulant}
            src="http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg"
          />
        </div>
        <div className={styles.postulantName}>
          {`${selectedPostulant.firstName} ${selectedPostulant.lastName}`}
        </div>
        <div className={styles.postulantDetails}>
          {`${selectedPostulant.openToWork ? 'Open to Work' : 'Not Available to Work'}`}
        </div>
        <EditButton
          onClick={() =>
            (window.location.href = `/postulant/postulants/form?id=${selectedPostulant._id}`)
          }
        />
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Personal Information</p>
          <button className={styles.collapseButton} onClick={handlePersonalInformationData}>
            {openPersonalInformationData ? '-' : '+'}
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
              <p className={styles.fieldName}>City</p>
              <p>{selectedPostulant.city}</p>
            </div>
            <div className={styles.dataField}>
              <p className={styles.fieldName}>Country</p>
              <p>{selectedPostulant.country}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.informationField}>
        <div className={styles.titleField}>
          <p>Academic Information</p>
          <button className={styles.collapseButton} onClick={handleAcademicInformationData}>
            {openAcademicInformationData ? '-' : '+'}
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
            {openWorkExperienceData ? '-' : '+'}
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
                    <td className={styles.tableTitle}>Client</td>
                    <td className={styles.tableTitle}>Start</td>
                    <td className={styles.tableTitle}>End</td>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td>
                        <p>{selectedPostulant.workExperience[0].title}</p>
                      </td>
                      <td>
                        <p>{selectedPostulant.workExperience[0].client}</p>
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
            {openDataOfInterestData ? '-' : '+'}
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
