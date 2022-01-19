import styles from './header.module.css';
import { useLocation, Link } from 'react-router-dom';
import { logOutUser } from 'helper/firebase';

const Header = () => {
  const logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    logOutUser();
  };

  const location = useLocation();
  let entity = location.pathname + '/';
  const firstLetter = entity.indexOf('/', 1);
  const lastLetter = entity.indexOf('/', firstLetter + 1);
  entity = entity.charAt(firstLetter + 1).toUpperCase() + entity.slice(firstLetter + 2, lastLetter);
  entity == '' ? (entity = 'Home') : entity;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>MindSet</div>
        <div className={styles.mainHead}>
          <div className={styles.entityName}> {entity} </div>
          <Link to="/">
            <span onClick={logOut} className={styles.signUp}>
              Log out
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
