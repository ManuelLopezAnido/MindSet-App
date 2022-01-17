import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const PsychologyNavbar = () => (
  <div className={styles.navBar}>
    <ul className={styles.items}>
      <Link to="/psychologists/sessions">
        <li className={styles.itemsBodyContent}>Sessions</li>
      </Link>
      <Link to="/psychologists/settings">
        <li className={styles.itemsBodyContent}>Settings</li>
      </Link>
      <Link to="/psychologists/profile">
        <li className={styles.itemsBodyContent}>Profile</li>
      </Link>
    </ul>
  </div>
);

export default PsychologyNavbar;
