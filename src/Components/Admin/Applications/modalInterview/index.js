import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './modalInterview.module.css';
import { getPostulants } from 'redux/postulants/thunks';

const modalInterview = (props) => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const postulants = useSelector((store) => store.postulants.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostulants());
  }, []);
  console.log('Postulants: ', postulants);
  console.log('ID traida: ', props.postId);

  const postulantSelected = postulants.find((postulant) => props.postId == postulant._id);
  console.log('postulant selected', postulantSelected);
  let options = [];
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
          value: i,
          toShow: day
        });
      }
    });
    console.log('options are: ', options);
    options2 = postulantSelected?.availability.map((av) => ({
      value: av.from,
      toShow: av.from
    }));
  }
  const giveValue = (event) => {
    setSelectedDay(event.target.value);
  };

  if (props.show == false) {
    return null;
  }
  return (
    <div className={styles.backModal}>
      <div className={styles.Modal}>
        <div>Change profile</div>
        <div className={styles.container}>
          <label>Please select profile for the postulant</label>
          <select onChange={giveValue} className={styles.select} defaultValue={''}>
            <option value="" disabled hidden>
              Choose a day..
            </option>
            {options.map((option) => (
              <option key={new Date().getTime().toString() + option.value} value={option.value}>
                {option.toShow}
              </option>
            ))}
          </select>
        </div>
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
            disabled={!selectedDay}
            onClick={() => {
              props.close();
              console.log('day: ', selectedDay);
              // props.action(selectedDay, props.postId, props.sessionSelected);
            }}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
export default modalInterview;
