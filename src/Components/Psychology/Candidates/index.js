import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulants } from 'redux/postulants/thunks';
import { errorToDefault } from 'redux/admins/actions';

const Candidates = () => {
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const loading = useSelector((store) => store.postulants.isLoading);
  const errMessage = useSelector((store) => store.postulants.error);
  useEffect(() => {
    dispatch(getPostulants());
  }, []);
  console.log(postulants);
  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };
  if (loading) {
    return <IsLoading />;
  }
  return (
    <>
      <ErrorModal
        showModal={errMessage}
        middleText={errMessage}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <h2>CANDIDATES</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Position</th>
            <th>Job Title</th>
            <th>Session</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => {
            return (
              <tr key={postulant._id}>
                <td>{postulant.firstName + ' ' + postulant.lastName}</td>
                <td> Profile ¿? </td>
                <td> Job title ¿? </td>
                <td> Interview ¿? </td>
                <td> Change Profile </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Candidates;
