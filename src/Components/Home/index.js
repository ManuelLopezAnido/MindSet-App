import JobOffers from 'Components/Postulant/JobOffers';
import styles from './homePage.module.css';

const homePage = () => {
  return (
    <section>
      <div className={styles.textContainer}>
        <h1>
          Welcome to <span>MindSet!</span>
        </h1>
        <h2>The most trending web for recruiting.</h2>
      </div>
      <JobOffers />
    </section>
  );
};

export default homePage;
