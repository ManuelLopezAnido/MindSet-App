import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCounselor } from 'redux/counselors/thunks';
import styles from './profile.module.css';
import listStyles from 'lists.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  let thisPsychologist = sessionStorage.getItem('id');

  useEffect(() => {
    dispatch(getOneCounselor(thisPsychologist));
  });
  const selectedCounselor = useSelector((store) => store.counselors.selected);

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.imagePostulant}>
            <img
              className={listStyles.logoEntity}
              src={
                'https://images.ctfassets.net/wgv5567aci3o/post_1237_afb3a9585d91/d206e0e0798a2510128b0f2c00b100fd/post-1237-afb3a9585d91?w=800&h=800&q=80&fit=fill&f=faces'
              }
            />
          </div>
          <div>
            <p className={styles.counselorName}>
              {selectedCounselor.firstName} {selectedCounselor.lastName}
            </p>
            <p className={styles.mindsetCounselor}>MindSet Counselor</p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Email</p>
            <p>{selectedCounselor.email}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Date of birth</p>
            <p>{selectedCounselor.birthday}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Address</p>
            <p>{selectedCounselor.address}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Phone</p>
            <p>{selectedCounselor.phone}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Gender</p>
            <p>{selectedCounselor.gender}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>City</p>
            <p>{selectedCounselor.city}</p>
          </div>
          <div className={styles.dataEach}>
            <p className={styles.titleData}>Country</p>
            <p>{selectedCounselor.country}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
