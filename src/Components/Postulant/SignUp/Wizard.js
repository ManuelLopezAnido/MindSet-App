import React from 'react';
import { Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { changeStep } from 'redux/ui/actions';
import styles from './wizard.module.css';

const Wizard = ({ children, initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const step = useSelector((store) => store.ui.step);
  const pages = React.Children.toArray(children);
  const currentPage = pages[step];

  const goNextPage = () => dispatch(changeStep(step + 1));
  const goPrevPage = () => dispatch(changeStep(step - 1));

  const ButtonPrev = () => (
    <button
      type="button"
      onClick={goPrevPage}
      className={`${styles.btn} ${styles.prevBtn} ${step > 0 ? styles.showBtn : ''}`}
    >
      Previous
    </button>
  );
  const ButtonNext = () => (
    <button
      type="button"
      onClick={goNextPage}
      className={`${styles.btn} ${styles.nextBtn} ${step < pages.length - 1 ? styles.showBtn : ''}`}
    >
      Next
    </button>
  );

  return (
    <div className={styles.wizard}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className="wizard__content">
            {currentPage}
            {step === pages.length - 1 ? (
              <button type="submit" disabled={step < pages.length - 1}>
                Submit
              </button>
            ) : null}
          </form>
        )}
      />
      <div className={styles.wizardButtons}>
        <ButtonPrev />
        <ButtonNext />
      </div>
    </div>
  );
};

export default Wizard;
