import styles from './candidates.module.css';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulants, updatePostulant } from 'redux/postulants/thunks';
import { errorToDefault } from 'redux/admins/actions';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import ModalProfile from './modalProfile';
import { getPositions } from 'redux/positions/thunks';
import { addApplication, deleteApplication, getApplications } from 'redux/applications/thunks';
import { getOneCounselor } from 'redux/counselors/thunks';

const Sessions = () => {
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const sessions = useSelector((store) => store.sessions.list);
  const positions = useSelector((store) => store.positions.list);
  const applications = useSelector((store) => store.applications.list);
  const loading = useSelector((store) => store.postulants.isLoading);
  const errMessage = useSelector((store) => store.postulants.error);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [postIdSelected, setPostIdSelected] = useState(undefined);
  const [sessionSelected, setSessionsSelected] = useState(undefined);

  const params = new URLSearchParams(window.location.search);
  let thisPsychologist = params.get('id');

  useEffect(() => {
    if (thisPsychologist) {
      sessionStorage.setItem('id', thisPsychologist);
    } else {
      thisPsychologist = sessionStorage.getItem('id');
    }
  }, []);

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getSessions());
    dispatch(getPositions());
    dispatch(getApplications());
  }, []);
  const sessionsFiltred = sessions.filter((session) =>
    session?.counselorId
      ? session.counselorId._id == thisPsychologist && session.postulantId
      : false
  );

  const postulantProfile = (session) => {
    const postulantName = postulants.find(
      (postulant) => postulant._id == session?.postulantId?._id
    );
    return postulantName?.profile.name ?? 'Not defind';
  };

  const changeProfile = (postulantProfile, postId, sessionToModify) => {
    const selectedPostulant = postulants.find((postulant) => postulant?._id == postId);
    selectedPostulant.profile = postulantProfile;
    dispatch(updatePostulant(postId, selectedPostulant)).then(() => dispatch(getPostulants()));
    applications.forEach((application) => {
      if (postId == application.postulantId?._id) {
        dispatch(deleteApplication(application._id));
      }
    });
    const applicationsToCreate = [];
    positions.forEach((position) => {
      if (postulantProfile == position.profile?._id) {
        return applicationsToCreate.push({
          positionId: position._id,
          clientId: position.clientId?._id,
          postulantId: postId
        });
      }
    });
    applicationsToCreate.forEach((app) => {
      dispatch(addApplication(app));
    });
    sessionToModify.accomplished = true;
    dispatch(updateSession(sessionToModify._id, sessionToModify));
  };

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };
  if (loading) {
    return <IsLoading />;
  }
  return (
    <section className={styles.Candidates}>
      <ErrorModal
        showModal={errMessage}
        middleText={errMessage}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <ModalProfile
        show={showModalProfile}
        postId={postIdSelected}
        sessionSelected={sessionSelected}
        action={changeProfile}
        close={() => {
          setShowModalProfile(false);
        }}
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
                <td>
                  {sessionFil.accomplished ? <text>Session done</text> : <text>Pending</text>}
                </td>
                <td
                  onClick={() => {
                    setShowModalProfile(true);
                    setPostIdSelected(sessionFil.postulantId?._id);
                    setSessionsSelected(sessionFil);
                  }}
                >
                  Change Profile
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Sessions;
