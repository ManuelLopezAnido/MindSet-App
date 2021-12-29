import styles from './homePageLayout.module.css';
import HomePageHeader from './HomePageHeader';

const HomePageLayout = (props) => {
  return (
    <div className={styles.container}>
      <HomePageHeader />
      <div>{props.children}</div>
    </div>
  );
};

export default HomePageLayout;
