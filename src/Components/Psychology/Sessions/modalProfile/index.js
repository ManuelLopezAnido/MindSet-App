import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProfiles } from 'redux/profiles/thunks';
import styles from './modalProfile.module.css';

const modalProfile = (props) => {
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const profiles = useSelector((store) => store.profiles.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  const options = profiles.map((profile) => ({
    value: profile._id,
    toShow: profile.name
  }));
  const giveValue = (event) => {
    setSelectedProfile(event.target.value);
  };
  if (props.show == false) {
    return null;
  }
  return (
    <div className={styles.backModal}>
      <div className={styles.Modal}>
        <div className={styles.changeProfile}>Change profile</div>
        <div className={styles.container}>
          <p className={styles.pleaseSelectProfile}>Please select profile for the postulant</p>
          <select onChange={giveValue} className={styles.select} defaultValue={''}>
            <option value="" disabled hidden>
              Choose a profile..
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.toShow}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonsContainer}>
          <div>
            <button
              onClick={() => {
                props.close();
              }}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              disabled={!selectedProfile}
              onClick={() => {
                props.close();
                props.action(selectedProfile, props.postId, props.sessionSelected);
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default modalProfile;
