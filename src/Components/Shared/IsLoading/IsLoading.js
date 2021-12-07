import styles from './isLoading.module.css';
import loadingImg from '../../../assets/images/loadingImage.png';

const IsLoading = () => (
  <div className={styles.loading}>
    <p>Loading...</p>
    <img src={loadingImg} />
  </div>
);

export default IsLoading;
