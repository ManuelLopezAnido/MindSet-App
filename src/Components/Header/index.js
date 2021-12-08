import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  let entity = location.pathname;
  entity = entity.charAt(1).toUpperCase() + entity.slice(2);
  entity == '' ? (entity = 'Home') : entity;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>MindSet</div>
        <div className={styles.mainhead}>
          <div className={styles.entityname}> {entity} </div>
          <div className={styles.Icons}>
            <div className={styles.socialIcons}>
              <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
                <img
                  className={styles.socialIcon}
                  src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
                />
              </a>
              <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
                <img
                  className={styles.socialIcon}
                  src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
                />
              </a>
              <a
                href={'https://www.instagram.com/radium.rocket/'}
                target={'_blank'}
                rel="noreferrer"
              >
                <img
                  className={styles.socialIcon}
                  src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
                />
              </a>
            </div>
            <div>Log Out</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
