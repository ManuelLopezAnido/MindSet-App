import styles from './NoData.module.css';

const NoData = (props) => {
  if (props.data != 0) {
    return null;
  }
  return (
    <div className={styles.NoData}>
      <p>No data avaliable</p>
    </div>
  );
};

export default NoData;
