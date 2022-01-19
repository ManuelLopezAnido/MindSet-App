import styles from './inputSearch.module.css';
import searchIcon from 'assets/images/searchIcon.png';

const InputSearch = ({ type, placeholder, onChange }) => {
  return (
    <div className={styles.input}>
      <input type={type} placeholder={placeholder} onChange={onChange}></input>
      <img src={searchIcon} />
    </div>
  );
};

export default InputSearch;
