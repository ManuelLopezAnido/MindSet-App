import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  let Entity = location.pathname;
  Entity = Entity.charAt(1).toUpperCase() + Entity.slice(2);
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>MindSet</div>
        <div className={styles.mainhead}>
          <div> {Entity} </div>
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
            <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
