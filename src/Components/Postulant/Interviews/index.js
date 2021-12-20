import styles from './interviews.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews } from 'redux/interviews/thunks';

const Interviews = () => {
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  useEffect(() => {
    dispatch(getInterviews());
  }, []);

  return (
    <div className={styles.interviews}>
      <h2> News Interviews</h2>
      <table>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Date and Hour</th>
          <th>Actions</th>
        </tr>
      </table>
    </div>
  );
};
export default Interviews;
