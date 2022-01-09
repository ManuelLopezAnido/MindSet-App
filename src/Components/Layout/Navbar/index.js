import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => (
  <div className={styles.navBar}>
    <ul className={styles.items}>
      <Link to="/admin/counselors">
        <li className={styles.itemsBodyContent}>Counselors</li>
      </Link>
      <Link to="/admin/clients">
        <li className={styles.itemsBodyContent}>Clients</li>
      </Link>
      <Link to="/admin/postulants">
        <li className={styles.itemsBodyContent}>Postulants</li>
      </Link>
      <Link to="/admin/positions">
        <li className={styles.itemsBodyContent}>Positions</li>
      </Link>
      <Link to="/admin/profiles">
        <li className={styles.itemsBodyContent}>Profiles</li>
      </Link>
      <Link to="/admin/admins">
        <li className={styles.itemsBodyContent}>Admins</li>
      </Link>
      <Link to="/admin/applications">
        <li className={styles.itemsBodyContent}>Applications</li>
      </Link>
      <Link to="/admin/interviews">
        <li className={styles.itemsBodyContent}>Interviews</li>
      </Link>
      <Link to="/admin/sessions">
        <li className={styles.itemsBodyContent}>Sessions</li>
      </Link>
    </ul>
  </div>
);

export default Navbar;
