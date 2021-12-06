import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul className={styles.items}>
        <Link to="/admins">
          <li className={styles.itemsbodycontent}>admins</li>
        </Link>
        <Link to="/applications">
          <li className={styles.itemsbodycontent}>Applications</li>
        </Link>
        <Link to="/clients">
          <li className={styles.itemsbodycontent}>Clients</li>
        </Link>
        <Link to="/interviews">
          <li className={styles.itemsbodycontent}>Interviews</li>
        </Link>
        <Link to="/positions">
          <li className={styles.itemsbodycontent}>Positions</li>
        </Link>
        <Link to="/postulants">
          <li className={styles.itemsbodycontent}>Postulants</li>
        </Link>
        <Link to="/profiles">
          <li className={styles.itemsbodycontent}>Profiles</li>
        </Link>
        <Link to="/counselors">
          <li className={styles.itemsbodycontent}>Counselors</li>
        </Link>
        <Link to="/sessions">
          <li className={styles.itemsbodycontent}>Sessions</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
