import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => (
  <div className={styles.navBar}>
    <ul className={styles.items}>
      <Link to="/admins">
        <li className={styles.itemsBodyContent}>Admins</li>
      </Link>
      <Link to="/applications">
        <li className={styles.itemsBodyContent}>Applications</li>
      </Link>
      <Link to="/clients">
        <li className={styles.itemsBodyContent}>Clients</li>
      </Link>
      <Link to="/interviews">
        <li className={styles.itemsBodyContent}>Interviews</li>
      </Link>
      <Link to="/positions">
        <li className={styles.itemsBodyContent}>Positions</li>
      </Link>
      <Link to="/postulants">
        <li className={styles.itemsBodyContent}>Postulants</li>
      </Link>
      <Link to="/profiles">
        <li className={styles.itemsBodyContent}>Profiles</li>
      </Link>
      <Link to="/counselors">
        <li className={styles.itemsBodyContent}>Counselors</li>
      </Link>
      <Link to="/sessions">
        <li className={styles.itemsBodyContent}>Sessions</li>
      </Link>
    </ul>
  </div>
);

export default Navbar;
