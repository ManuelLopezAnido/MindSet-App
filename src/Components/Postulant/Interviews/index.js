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
  console.log(interviews);
  return (
    <div className={styles.interviews}>
      <h2> News Interviews</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Date and Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
export default Interviews;
