import styles from './homePage.module.css';
import { useLocation, Link } from 'react-router-dom';

const HomePageHeader = () => {
  const location = useLocation();
  let entity = location.pathname;
  entity = entity.charAt(1).toUpperCase() + entity.slice(2);
  entity == '' ? (entity = 'Home') : entity;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.mainHead}>
          <div className={styles.title}>
            <Link to="/">MindSet</Link>
          </div>
          <div>
            <Link to="/auth/login">
              <span className={styles.signUp}>Log In</span>
            </Link>
            <Link to="/auth/signUp">
              <span className={styles.signUp}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;
