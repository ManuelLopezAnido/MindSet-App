import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul className={styles.items}>
        <li className={styles.itemsbodycontent}>
          <Link to="/admins"> Admins</Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/applications"> Applications</Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/clients"> Clients </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/interviews"> Interviews </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/positions"> Positions </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/postulants"> Postulants </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/profiles"> Profiles </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/counselores"> Counselors </Link>
        </li>
        <li className={styles.itemsbodycontent}>
          <Link to="/sessions"> Sessions </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
