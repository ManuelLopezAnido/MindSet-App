import styles from './JobOffers.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
const JobOffers = () => {
  const dispatch = useDispatch();
  const jobOffers = useSelector((store) => store.positions.list);
  useEffect(() => {
    dispatch(getPositions());
  }, []);
  console.log(jobOffers);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <section className={styles.sectionForm}>
          <form>
            <input className={styles.inputForm} type="text" placeholder="Search"></input>
            <button>Q</button>
            <button>Y</button>
          </form>
        </section>
        <section className={styles.containerJobsList}>
          {jobOffers.map((jobs) => (
            <div className={styles.jobContainer} key={jobs._id}>
              <h2>{jobs.jobTitle}</h2>
              <p>{jobs.jobDescription}</p>
              <h2>Company: {jobs.companyName}</h2>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
export default JobOffers;
