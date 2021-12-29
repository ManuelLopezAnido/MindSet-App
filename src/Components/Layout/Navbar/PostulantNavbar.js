import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const PostulantNavbar = () => (
  <div className={styles.navBar}>
    <ul className={styles.items}>
      <Link to="/postulant/profile">
        <li className={styles.itemsBodyContent}>Profile</li>
      </Link>
      <Link to="/postulant/interviews">
        <li className={styles.itemsBodyContent}>Interviews</li>
      </Link>
      <Link to="/postulant/jobOffers">
        <li className={styles.itemsBodyContent}>Job Offers</li>
      </Link>
    </ul>
  </div>
);

export default PostulantNavbar;
