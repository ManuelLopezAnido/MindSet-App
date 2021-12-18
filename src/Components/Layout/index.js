import Header from 'Components/Layout/Header';
import Navbar from 'Components/Layout/Navbar';
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Navbar />
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
