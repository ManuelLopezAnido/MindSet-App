import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  let entity = location.pathname;
  entity = entity.charAt(1).toUpperCase() + entity.slice(2);
  entity == '' ? (entity = 'Home') : entity;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>MindSet</div>
        <div className={styles.mainHead}>
          <div className={styles.entityName}> {entity} </div>
          <div>Log Out</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
