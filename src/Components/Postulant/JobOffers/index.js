import styles from './JobOffers.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const JobOffers = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.positions.isLoading);
  const jobOffers = useSelector((store) => store.positions.list);
  const [inputSearchBar, setInputSearchBar] = useState('');

  useEffect(() => {
    dispatch(getPositions());
  }, []);

  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <section className={styles.sectionForm}>
          <form>
            <input
              className={styles.inputForm}
              type="text"
              placeholder="Search"
              onChange={(event) => setInputSearchBar(event.target.value)}
            ></input>
          </form>
        </section>
        <section className={styles.containerJobsList}>
          {jobOffers
            .filter((jobOffer) => {
              if (
                jobOffer.jobTitle.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                jobOffer.clientName.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                jobOffer.city.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                jobOffer.country.toLowerCase().includes(inputSearchBar.toLowerCase())
              ) {
                return jobOffer;
              }
            })
            .map((jobs) => (
              <div className={styles.jobContainer} key={jobs._id}>
                <p className={styles.jobTitle}>{jobs.jobTitle}</p>
                <p className={styles.jobDescription}>{jobs.jobDescription}</p>
                <div className={styles.footerJobContainer}>
                  <p className={styles.clientName}>{jobs.clientName}</p>
                  <p className={styles.jobsLocation}>
                    {jobs.city}, {jobs.country}
                  </p>
                  <button className={styles.buttonShowJob} type="submit">
                    +
                  </button>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};
export default JobOffers;
