import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './modalInterview.module.css';
import { getPostulants } from 'redux/postulants/thunks';

const modalInterview = (props) => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const postulants = useSelector((store) => store.postulants.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostulants());
  }, []);

  const postulantSelected = postulants.find((postulant) => props.postId == postulant._id);
  let options = [];
  let fromTime = undefined;
  let toTime = undefined;
  let options2 = [];

  let day = undefined;
  if (postulantSelected) {
    postulantSelected.availability.forEach((av, i) => {
      if (av.available) {
        switch (i) {
          case 0:
            day = 'Monday';
            break;
          case 1:
            day = 'Tuesday';
            break;
          case 2:
            day = 'Wednesday';
            break;
          case 3:
            day = 'Thursday';
            break;
          case 4:
            day = 'Friday';
            break;
          case 5:
            day = 'Saturday';
            break;
          case 6:
            day = 'Sunday';
            break;
        }
        options.push({
          key: av._id,
          value: i,
          toShow: day
        });
      }
    });
    fromTime = Number(postulantSelected.availability[selectedDay]?.from);
    toTime = Number(postulantSelected.availability[selectedDay]?.to);
  }

  const giveValue = (event) => {
    setSelectedDay(event.target.value);
    setSelectedTime(undefined);
    console.log('ENTRE', selectedDay);
  };
  const giveValue2 = (event) => {
    setSelectedTime(event.target.value);
  };
  for (let cont = fromTime; cont <= toTime; cont++) {
    options2.push({
      key: cont,
      value: cont,
      toShow: cont.toString() + ' Hs'
    });
  }
  if (props.show == false) {
    return null;
  }
  return (
    <div className={styles.backModal}>
      <div className={styles.Modal}>
        <div className={styles.modalTitle}>
          Availability time of {postulantSelected.firstName + ' ' + postulantSelected.lastName}
        </div>
        <div className={styles.container}>
          <label>Please select the day of the Interview</label>
          <select onChange={giveValue} className={styles.select} defaultValue={''}>
            <option value="" disabled hidden>
              Choose a day..
            </option>
            {options.map((option) => (
              <option key={option.key} value={option.value}>
                {option.toShow}
              </option>
            ))}
          </select>
          {selectedDay ? (
            <>
              <label>Please select the time of the Interview</label>
              <select onChange={giveValue2} className={styles.select} defaultValue={''}>
                <option value="" disabled hidden>
                  Choose a time..
                </option>
                {options2.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.toShow}
                  </option>
                ))}
              </select>
            </>
          ) : null}
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
              disabled={!selectedDay || !selectedTime}
              onClick={() => {
                props.close();
                props.action(
                  selectedDay,
                  selectedTime,
                  props.positionId,
                  props.postId,
                  props.clientId,
                  props.appId
                );
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
export default modalInterview;
