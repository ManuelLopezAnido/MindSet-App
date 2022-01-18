import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getOneCounselor } from 'redux/counselors/thunks';

const Profile = () => {
  const dispatch = useDispatch();
  const thisPsychologist = '61e5fe2e51e6dc79e789300c'; //Id de hardcodeado de Josefina

  useEffect(() => {
    dispatch(getOneCounselor(thisPsychologist));
  });
  const selectedCounselor = useSelector((store) => store.counselors.selected);

  return (
    <>
      <div>
        <div>
          <p>ACA VA LA FOTO</p>
          <p>
            {selectedCounselor.firstName} {selectedCounselor.lastName}
          </p>
        </div>
        <div>
          <div>
            <p>Email</p>
            <p>{selectedCounselor.email}</p>
          </div>
          <div>
            <p>Date of birth</p>
            <p>{selectedCounselor.birthday}</p>
          </div>
          <div>
            <p>Address</p>
            <p>{selectedCounselor.address}</p>
          </div>
          <div>
            <p>Phone</p>
            <p>{selectedCounselor.phone}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{selectedCounselor.gender}</p>
          </div>
          <div>
            <p>City</p>
            <p>{selectedCounselor.city}</p>
          </div>
          <div>
            <p>Country</p>
            <p>{selectedCounselor.country}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
