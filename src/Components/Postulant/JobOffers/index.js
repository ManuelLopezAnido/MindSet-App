import styles from './JobOffers.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
const JobOffers = () => {
  const dispatch = useDispatch();
  const jobOffers = useSelector((store) => store.positions.list);
  useEffect(() => {
    dispatch(getPositions());
  }, []);

  return (
    <div>
      {jobOffers.map((jobs) => (
        <div key={jobs._id}>
          <h2>Job Title: {jobs.jobTitle}</h2>
          <h2>Company: {jobs.companyName}</h2>
          <p>Descprition: {jobs.jobDescription} </p>
        </div>
      ))}
    </div>
  );
};
export default JobOffers;
