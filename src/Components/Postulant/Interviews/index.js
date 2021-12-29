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
  const selectedPostulantId = '61a4398da318de40f22eba2c';
  let filtredInterviews = interviews.filter((interview) => {
    return interview.postulantId === selectedPostulantId;
  });
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
        <tbody>
          {filtredInterviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.jobTitle}</td>
              <td>{interview.companyName}</td>
              <td>{interview.time}</td>
              <td>delete / edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Interviews;
