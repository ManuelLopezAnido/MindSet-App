import Header from 'Components/Layout/Header';
import styles from './layout.module.css';
import PostulantNavbar from './Navbar/PostulantNavbar';

const PostulantLayout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <PostulantNavbar />
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

export default PostulantLayout;
