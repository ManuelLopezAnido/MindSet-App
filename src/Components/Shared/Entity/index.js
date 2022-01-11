import styles from './entity.module.css';

const Entity = (props) => {
  return <button className={styles.button}>Add a new {props.value} </button>;
};

export default Entity;
