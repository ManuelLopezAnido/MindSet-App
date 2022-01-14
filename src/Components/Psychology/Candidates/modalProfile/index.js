import styles from './modalProfile.module.css';
import Select from 'Components/Shared/Select';

const modalProfile = (props) => {
  const obtainValue = (optionSelected) => {
    console.log(optionSelected);
  };
  // if (props.show == false) {
  //   return null;
  // }
  return (
    <div className={styles.backModal}>
      <div className={styles.Modal}>
        <div>Modal Title</div>
        <div>
          <Select
            meta={{
              touched: false,
              error: false
            }}
            label={'Profile'}
            placeholder={'Profiles'}
            options={[
              { value: '1', toShow: 'Engeenier' },
              { value: '2', toShow: 'Artist' },
              { value: '3', toShow: 'Doctor' }
            ]}
            optionSelected={obtainValue}
          />
        </div>
      </div>
    </div>
  );
};
export default modalProfile;
