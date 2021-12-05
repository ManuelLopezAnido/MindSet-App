import Header from '../Header';
import Navbar from '../Navbar';
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      {props.children}
    </div>
  );
};

export default Layout;
