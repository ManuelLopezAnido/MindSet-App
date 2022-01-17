import Header from './Header';
import styles from './layout.module.css';
import PsychologyNavbar from './Navbar/PsychologyNavbar';
const PsychologyLayout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <PsychologyNavbar />
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};
export default PsychologyLayout;
