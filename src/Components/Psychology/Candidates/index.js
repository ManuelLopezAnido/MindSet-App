import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulants } from 'redux/postulants/thunks';
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
  const postName = (councelor) => {
    const postName = postulants.filter((postulant) => {
      postulant._id == councelor?.postulantId?._Id;
    });
    console.log('PsyId: ', councelor?.postulantId?._id);
    console.log('PostName: ', postName);
    return postName.firstName;
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
                <td>{postName(sessionFil)}</td>
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
