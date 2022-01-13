import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulants, updatePostulant } from 'redux/postulants/thunks';
import { errorToDefault } from 'redux/admins/actions';
import { getSessions } from 'redux/sessions/thunks';

const Candidates = () => {
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const sessions = useSelector((store) => store.sessions.list);
  const loading = useSelector((store) => store.postulants.isLoading);
  const errMessage = useSelector((store) => store.postulants.error);
  const thisPsychologist = '61b7f956c929a1aa15d03640'; //Id de hardcodeado de Josefina
  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getSessions());
  }, []);
  console.log('Postulants: ', postulants);
  console.log('Sessions: ', sessions[0]?.counselorId);
  console.log('Sessions: ', sessions);
  const sessionsFiltred = sessions.filter((session) =>
    session?.counselorId ? session.counselorId._id == thisPsychologist : false
  );
  console.log('filtred', sessionsFiltred);

  const postulantProfile = (session) => {
    const postulantName = postulants.filter(
      (postulant) => postulant._id == session?.postulantId?._id
    );
    return postulantName[0]?.email;
  };
  const changeProfile = (postId) => {
    const selectedPostulant = postulants.filter((postulant) => postulant?._id == postId);
    selectedPostulant[0].email = 'developer2@hotmail.com';
    dispatch(updatePostulant(postId, selectedPostulant[0]));
  };
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
            <th>Profile</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessionsFiltred.map((sessionFil) => {
            return (
              <tr key={sessionFil._id}>
                <td>
                  {sessionFil.postulantId?.firstName + ' ' + sessionFil.postulantId?.lastName}
                </td>
                <td>{postulantProfile(sessionFil)}</td>
                <td> {sessionFil?.date.substring(6) + ' ' + sessionFil?.time}</td>
                <td> {sessionFil.accomplished} </td>
                <td onClick={() => changeProfile(sessionFil.postulantId._id)}> Change Profile </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Candidates;
