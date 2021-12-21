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
  console.log(jobOffers);

  return (
    <div>
      <h2>Job Offers</h2>
      <h3>Postulant: Juan</h3>
    </div>
  );
};
export default JobOffers;
