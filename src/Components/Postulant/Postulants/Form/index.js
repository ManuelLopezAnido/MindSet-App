import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import SaveButton from 'Components/Shared/SaveButton';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOnePostulant, addPostulant, updatePostulant } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/postulants/actions';
import { useHistory } from 'react-router-dom';

const PostulantsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [dateOfBirthValue, setDateOfBirthValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  const [elementarySchoolNameValue, setElementarySchoolNameValue] = useState('');
  const [elementarySchoolDegreeValue, setElementarySchoolDegreeValue] = useState('');
  const [elementarySchoolGraduateYearValue, setElementarySchoolGraduateYearValue] = useState(0);

  const [highSchoolNameValue, setHighSchoolNameValue] = useState('');
  const [highSchoolDegreeValue, setHighSchoolDegreeValue] = useState('');
  const [highSchoolGraduateYearValue, setHighSchoolGraduateYearValue] = useState(0);

  const [juniorCollegeNameValue, setJuniorCollegeNameValue] = useState('');
  const [juniorCollegeDegreeValue, setJuniorCollegeDegreeValue] = useState('');
  const [juniorCollegeGraduateYearValue, setJuniorCollegeGraduateYearValue] = useState(0);

  const [universityNameValue, setUniversityNameValue] = useState('');
  const [universityDegreeValue, setUniversityDegreeValue] = useState('');
  const [universityGraduateYearValue, setUniversityGraduateYearValue] = useState(0);

  const [openToWork, setOpenToWork] = useState(false);

  const [workExperienceTitleValue, setWorkExperienceTitleValue] = useState('');
  const [workExperienceStartValue, setWorkExperienceStartValue] = useState('');
  const [workExperienceEndValue, setWorkExperienceEndValue] = useState('');
  const [workExperienceClientValue, setWorkExperienceClientValue] = useState('');
  const [workExperienceDescriptionValue, setWorkExperienceDescriptionValue] = useState('');

  const [profTrainingDescriptionValue, setProfTrainingDescriptionValue] = useState('');
  const [profTrainingYearValue, setProfTrainingYearValue] = useState('');

  const [languagesValue, setLanguagesValue] = useState('');
  const [hobbiesValue, setHobbiesValue] = useState('');

  const [familyMember1NameValue, setFamilyMember1NameValue] = useState('');
  const [familyMember1bondValue, setFamilyMember1bondValue] = useState('');

  const [familyMember2NameValue, setFamilyMember2NameValue] = useState('');
  const [familyMember2bondValue, setFamilyMember2bondValue] = useState('');

  const [familyMember3NameValue, setFamilyMember3NameValue] = useState('');
  const [familyMember3bondValue, setFamilyMember3bondValue] = useState('');

  const [familyMember4NameValue, setFamilyMember4NameValue] = useState('');
  const [familyMember4bondValue, setFamilyMember4bondValue] = useState('');

  const [availabilityCheckMondayValue, setAvailabilityCheckMondayValue] = useState(false);
  const [availabilityFromMondayValue, setAvailabilityFromMondayValue] = useState('-');
  const [availabilityToMondayValue, setAvailabilityToMondayValue] = useState('-');

  const [availabilityCheckTuesdayValue, setAvailabilityCheckTuesdayValue] = useState(false);
  const [availabilityFromTuesdayValue, setAvailabilityFromTuesdayValue] = useState('-');
  const [availabilityToTuesdayValue, setAvailabilityToTuesdayValue] = useState('-');

  const [availabilityCheckWednesdayValue, setAvailabilityCheckWednesdayValue] = useState(false);
  const [availabilityFromWednesdayValue, setAvailabilityFromWednesdayValue] = useState('-');
  const [availabilityToWednesdayValue, setAvailabilityToWednesdayValue] = useState('-');

  const [availabilityCheckThursdayValue, setAvailabilityCheckThursdayValue] = useState(false);
  const [availabilityFromThursdayValue, setAvailabilityFromThursdayValue] = useState('-');
  const [availabilityToThursdayValue, setAvailabilityToThursdayValue] = useState('-');

  const [availabilityCheckFridayValue, setAvailabilityCheckFridayValue] = useState(false);
  const [availabilityFromFridayValue, setAvailabilityFromFridayValue] = useState('-');
  const [availabilityToFridayValue, setAvailabilityToFridayValue] = useState('-');

  const [availabilityCheckSaturdayValue, setAvailabilityCheckSaturdayValue] = useState(false);
  const [availabilityFromSaturdayValue, setAvailabilityFromSaturdayValue] = useState('-');
  const [availabilityToSaturdayValue, setAvailabilityToSaturdayValue] = useState('-');

  const [availabilityCheckSundayValue, setAvailabilityCheckSundayValue] = useState(false);
  const [availabilityFromSundayValue, setAvailabilityFromSundayValue] = useState('-');
  const [availabilityToSundayValue, setAvailabilityToSundayValue] = useState('-');

  const dispatch = useDispatch();

  const history = useHistory();

  const isLoading = useSelector((store) => store.postulants.isLoading);
  const error = useSelector((store) => store.postulants.error);
  const errorMessage = useSelector((store) => store.postulants.errorMessage);
  const selectedPostulant = useSelector((store) => store.postulants.selected);

  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');

  console.log('params ', params);
  console.log('postulantId: ', params.get('_id'));

  if (postulantId) {
    useEffect(() => {
      dispatch(getOnePostulant(postulantId));
    }, []);
  }

  useEffect(() => {
    if (Object.keys(selectedPostulant).length <= 0) return;
    setFirstNameValue(selectedPostulant.firstName ?? '-');
    setLastNameValue(selectedPostulant.lastName ?? '-');
    setEmailValue(selectedPostulant.email ?? '-');
    setPhoneValue(selectedPostulant.phone ?? '-');
    setDateOfBirthValue(selectedPostulant.dateOfBirth ?? '-');
    setGenderValue(selectedPostulant.gender ?? '-');
    setCityValue(selectedPostulant.city ?? '-');
    setStateValue(selectedPostulant.state ?? '-');
    setCountryValue(selectedPostulant.country ?? '-');

    setElementarySchoolNameValue(selectedPostulant.elementarySchool[0]?.name || '-');
    setElementarySchoolDegreeValue(selectedPostulant.elementarySchool[0]?.degree || '-');
    setElementarySchoolGraduateYearValue(selectedPostulant.elementarySchool[0]?.graduateYear || 0);

    setHighSchoolNameValue(selectedPostulant.highSchool[0]?.name || '-');
    setHighSchoolDegreeValue(selectedPostulant.highSchool[0]?.degree || '-');
    setHighSchoolGraduateYearValue(selectedPostulant.highSchool[0]?.graduateYear || 0);

    setJuniorCollegeNameValue(selectedPostulant.juniorCollege[0]?.name || '-');
    setJuniorCollegeDegreeValue(selectedPostulant.juniorCollege[0]?.degree || '-');
    setJuniorCollegeGraduateYearValue(selectedPostulant.juniorCollege[0]?.graduateYear || 0);

    setUniversityNameValue(selectedPostulant.university[0]?.name || '-');
    setUniversityDegreeValue(selectedPostulant.university[0]?.degree || '-');
    setUniversityGraduateYearValue(selectedPostulant.university[0]?.graduateYear || 0);

    setOpenToWork(selectedPostulant.openToWork);

    setWorkExperienceTitleValue(selectedPostulant.workExperience[0]?.title || '-');
    setWorkExperienceStartValue(selectedPostulant.workExperience[0]?.start || '2000-05-20');
    setWorkExperienceEndValue(selectedPostulant.workExperience[0]?.end || '2000-02-20');
    setWorkExperienceClientValue(selectedPostulant.workExperience[0]?.client || '-');
    setWorkExperienceDescriptionValue(selectedPostulant.workExperience[0]?.description || '-');

    setProfTrainingDescriptionValue(selectedPostulant.professionalTraining[0]?.description || '-');
    setProfTrainingYearValue(selectedPostulant.professionalTraining[0]?.year || 0);

    setLanguagesValue(selectedPostulant.languages || '');
    setHobbiesValue(selectedPostulant.hobbies || '');

    setFamilyMember1NameValue(selectedPostulant.familyMembers[0]?.name || '-');
    setFamilyMember1bondValue(selectedPostulant.familyMembers[0]?.bond || '-');

    setFamilyMember2NameValue(selectedPostulant.familyMembers[1]?.name || '-');
    setFamilyMember2bondValue(selectedPostulant.familyMembers[1]?.bond || '-');

    setFamilyMember3NameValue(selectedPostulant.familyMembers[2]?.name || '-');
    setFamilyMember3bondValue(selectedPostulant.familyMembers[2]?.bond || '-');

    setFamilyMember4NameValue(selectedPostulant.familyMembers[3]?.name || '-');
    setFamilyMember4bondValue(selectedPostulant.familyMembers[3]?.bond || '-');

    setAvailabilityCheckMondayValue(selectedPostulant.availability[0]?.available);
    setAvailabilityFromMondayValue(selectedPostulant.availability[0]?.from || '-');
    setAvailabilityToMondayValue(selectedPostulant.availability[0]?.to || '-');

    setAvailabilityCheckTuesdayValue(selectedPostulant.availability[1]?.available);
    setAvailabilityFromTuesdayValue(selectedPostulant.availability[1]?.from || '-');
    setAvailabilityToTuesdayValue(selectedPostulant.availability[1]?.to || '-');

    setAvailabilityCheckWednesdayValue(selectedPostulant.availability[2]?.available);
    setAvailabilityFromWednesdayValue(selectedPostulant.availability[2]?.from || '-');
    setAvailabilityToWednesdayValue(selectedPostulant.availability[2]?.to || '-');

    setAvailabilityCheckThursdayValue(selectedPostulant.availability[3]?.available);
    setAvailabilityFromThursdayValue(selectedPostulant.availability[3]?.from || '-');
    setAvailabilityToThursdayValue(selectedPostulant.availability[3]?.to || '-');

    setAvailabilityCheckFridayValue(selectedPostulant.availability[4]?.available);
    setAvailabilityFromFridayValue(selectedPostulant.availability[4]?.from || '-');
    setAvailabilityToFridayValue(selectedPostulant.availability[4]?.to || '-');

    setAvailabilityCheckSaturdayValue(selectedPostulant.availability[5]?.available);
    setAvailabilityFromSaturdayValue(selectedPostulant.availability[5]?.from || '-');
    setAvailabilityToSaturdayValue(selectedPostulant.availability[5]?.to || '-');

    setAvailabilityCheckSundayValue(selectedPostulant.availability[6]?.available);
    setAvailabilityFromSundayValue(selectedPostulant.availability[6]?.from || '-');
    setAvailabilityToSundayValue(selectedPostulant.availability[6]?.to || '-');
    if (!postulantId) {
      setFirstNameValue('');
      setLastNameValue('');
      setEmailValue('');
      setPhoneValue('');
      setDateOfBirthValue('');
      setGenderValue('');
      setCityValue('');
      setStateValue('');
      setCountryValue('');

      setElementarySchoolNameValue('');
      setElementarySchoolDegreeValue('');
      setElementarySchoolGraduateYearValue('');

      setHighSchoolNameValue('');
      setHighSchoolDegreeValue('');
      setHighSchoolGraduateYearValue('');

      setJuniorCollegeNameValue('');
      setJuniorCollegeDegreeValue('');
      setJuniorCollegeGraduateYearValue('');

      setUniversityNameValue('');
      setUniversityDegreeValue('');
      setUniversityGraduateYearValue('');

      setOpenToWork(false);

      setWorkExperienceTitleValue('');
      setWorkExperienceStartValue('');
      setWorkExperienceEndValue('');
      setWorkExperienceClientValue('');
      setWorkExperienceDescriptionValue('');

      setProfTrainingDescriptionValue('');
      setProfTrainingYearValue('');

      setLanguagesValue('');
      setHobbiesValue('');

      setFamilyMember1NameValue('');
      setFamilyMember1bondValue('');

      setFamilyMember2NameValue('');
      setFamilyMember2bondValue('');

      setFamilyMember3NameValue('');
      setFamilyMember3bondValue('');

      setFamilyMember4NameValue('');
      setFamilyMember4bondValue('');

      setAvailabilityCheckMondayValue(false);
      setAvailabilityFromMondayValue('');
      setAvailabilityToMondayValue('');

      setAvailabilityCheckTuesdayValue(false);
      setAvailabilityFromTuesdayValue('');
      setAvailabilityToTuesdayValue('');

      setAvailabilityCheckWednesdayValue(false);
      setAvailabilityFromWednesdayValue('');
      setAvailabilityToWednesdayValue('');

      setAvailabilityCheckThursdayValue(false);
      setAvailabilityFromThursdayValue('');
      setAvailabilityToThursdayValue('');

      setAvailabilityCheckFridayValue(false);
      setAvailabilityFromFridayValue('');
      setAvailabilityToFridayValue('');

      setAvailabilityCheckSaturdayValue(false);
      setAvailabilityFromSaturdayValue('');
      setAvailabilityToSaturdayValue('');

      setAvailabilityCheckSundayValue(false);
      setAvailabilityFromSundayValue('');
      setAvailabilityToSundayValue('');
    }
  }, [selectedPostulant]);

  const onChangeFirstName = (event) => {
    setFirstNameValue(event.target.value);
  };

  const onChangeLastName = (event) => {
    setLastNameValue(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangePhone = (event) => {
    setPhoneValue(event.target.value);
  };

  const onChangeBirth = (event) => {
    setDateOfBirthValue(event.target.value);
  };

  const onChangeGender = (event) => {
    setGenderValue(event.target.value);
  };

  const onChangeCity = (event) => {
    setCityValue(event.target.value);
  };

  const onChangeState = (event) => {
    setStateValue(event.target.value);
  };

  const onChangeCountry = (event) => {
    setCountryValue(event.target.value);
  };

  const onChangeSchoolName = (event) => {
    setElementarySchoolNameValue(event.target.value);
  };

  const onChangeSchoolDegree = (event) => {
    setElementarySchoolDegreeValue(event.target.value);
  };

  const onChangeSchoolGraduateYear = (event) => {
    setElementarySchoolGraduateYearValue(event.target.value);
  };

  const onChangeHighSchool = (event) => {
    setHighSchoolNameValue(event.target.value);
  };

  const onChangeHighSchoolDegree = (event) => {
    setHighSchoolDegreeValue(event.target.value);
  };

  const onChangeHighSchoolGraduate = (event) => {
    setHighSchoolGraduateYearValue(event.target.value);
  };

  const onChangeJuniorCollege = (event) => {
    setJuniorCollegeNameValue(event.target.value);
  };

  const onChangeJuniorCollegeDegree = (event) => {
    setJuniorCollegeDegreeValue(event.target.value);
  };

  const onChangeJuniorCollegeGraduate = (event) => {
    setJuniorCollegeGraduateYearValue(event.target.value);
  };

  const onChangeUniversity = (event) => {
    setUniversityNameValue(event.target.value);
  };

  const onChangeUniversityDegree = (event) => {
    setUniversityDegreeValue(event.target.value);
  };

  const onChangeUniversityGraduate = (event) => {
    setUniversityGraduateYearValue(event.target.value);
  };

  const onChangeOpenToWork = (event) => {
    setOpenToWork(event.target.checked);
  };

  const onChangeWorkExperience = (event) => {
    setWorkExperienceTitleValue(event.target.value);
  };

  const onChangeWorkExperienceStart = (event) => {
    setWorkExperienceStartValue(event.target.value);
  };

  const onChangeWorkExperienceEnd = (event) => {
    setWorkExperienceEndValue(event.target.value);
  };

  const onChangeWorkExperienceClient = (event) => {
    setWorkExperienceClientValue(event.target.value);
  };

  const onChangeWorkExperienceDescription = (event) => {
    setWorkExperienceDescriptionValue(event.target.value);
  };

  const onChangeProfTrainingDescription = (event) => {
    setProfTrainingDescriptionValue(event.target.value);
  };

  const onChangeProfTrainingYear = (event) => {
    setProfTrainingYearValue(event.target.value);
  };

  const onChangeLanguages = (event) => {
    setLanguagesValue(event.target.value);
  };

  const onChangeHobbies = (event) => {
    setHobbiesValue(event.target.value);
  };

  const onChangeFamlilyMember1Name = (event) => {
    setFamilyMember1NameValue(event.target.value);
  };

  const onChangeFamlilyMember1Bond = (event) => {
    setFamilyMember1bondValue(event.target.value);
  };

  const onChangeFamlilyMember2Name = (event) => {
    setFamilyMember2NameValue(event.target.value);
  };

  const onChangeFamlilyMember2Bond = (event) => {
    setFamilyMember2bondValue(event.target.value);
  };

  const onChangeFamlilyMember3Name = (event) => {
    setFamilyMember3NameValue(event.target.value);
  };

  const onChangeFamlilyMember3Bond = (event) => {
    setFamilyMember3bondValue(event.target.value);
  };

  const onChangeFamlilyMember4Name = (event) => {
    setFamilyMember4NameValue(event.target.value);
  };

  const onChangeFamlilyMember4Bond = (event) => {
    setFamilyMember4bondValue(event.target.value);
  };

  const onChangeMonday = (event) => {
    setAvailabilityCheckMondayValue(event.target.checked);
  };

  const onChangeTuesday = (event) => {
    setAvailabilityCheckTuesdayValue(event.target.checked);
  };

  const onChangeWednesday = (event) => {
    setAvailabilityCheckWednesdayValue(event.target.checked);
  };

  const onChangeThursday = (event) => {
    setAvailabilityCheckThursdayValue(event.target.checked);
  };

  const onChangeFriday = (event) => {
    setAvailabilityCheckFridayValue(event.target.checked);
  };

  const onChangeSaturday = (event) => {
    setAvailabilityCheckSaturdayValue(event.target.checked);
  };

  const onChangeSunday = (event) => {
    setAvailabilityCheckSundayValue(event.target.checked);
  };

  const onChangeMondayFrom = (event) => {
    setAvailabilityFromMondayValue(event.target.value);
  };

  const onChangeTuesdayFrom = (event) => {
    setAvailabilityFromTuesdayValue(event.target.value);
  };

  const onChangeWednesdayFrom = (event) => {
    setAvailabilityFromWednesdayValue(event.target.value);
  };

  const onChangeThursdayFrom = (event) => {
    setAvailabilityFromThursdayValue(event.target.value);
  };

  const onChangeFridayFrom = (event) => {
    setAvailabilityFromFridayValue(event.target.value);
  };

  const onChangeSaturdayFrom = (event) => {
    setAvailabilityFromSaturdayValue(event.target.value);
  };

  const onChangeSundayFrom = (event) => {
    setAvailabilityFromSundayValue(event.target.value);
  };

  const onChangeMondayTo = (event) => {
    setAvailabilityToMondayValue(event.target.value);
  };

  const onChangeTuesdayTo = (event) => {
    setAvailabilityToTuesdayValue(event.target.value);
  };

  const onChangeWednesdayTo = (event) => {
    setAvailabilityToWednesdayValue(event.target.value);
  };

  const onChangeThursdayTo = (event) => {
    setAvailabilityToThursdayValue(event.target.value);
  };

  const onChangeFridayTo = (event) => {
    setAvailabilityToFridayValue(event.target.value);
  };

  const onChangeSaturdayTo = (event) => {
    setAvailabilityToSaturdayValue(event.target.value);
  };

  const onChangeSundayTo = (event) => {
    setAvailabilityToSundayValue(event.target.value);
  };

  const submit = () => {
    const data = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: phoneValue,
      dateOfBirth: dateOfBirthValue,
      gender: genderValue,
      city: cityValue,
      state: stateValue,
      country: countryValue,
      elementarySchool: [
        {
          name: elementarySchoolNameValue,
          degree: elementarySchoolDegreeValue,
          graduateYear: elementarySchoolGraduateYearValue
        }
      ],
      highSchool: [
        {
          name: highSchoolNameValue,
          degree: highSchoolDegreeValue,
          graduateYear: highSchoolGraduateYearValue
        }
      ],
      juniorCollege: [
        {
          name: juniorCollegeNameValue,
          degree: juniorCollegeDegreeValue,
          graduateYear: juniorCollegeGraduateYearValue
        }
      ],
      university: [
        {
          name: universityNameValue,
          degree: universityDegreeValue,
          graduateYear: universityGraduateYearValue
        }
      ],
      openToWork: openToWork,
      workExperience: [
        {
          title: workExperienceTitleValue,
          start: workExperienceStartValue,
          end: workExperienceEndValue,
          client: workExperienceClientValue,
          description: workExperienceDescriptionValue
        }
      ],
      professionalTraining: [
        {
          description: profTrainingDescriptionValue,
          year: profTrainingYearValue
        }
      ],
      languages: languagesValue,
      hobbies: hobbiesValue,
      familyMembers: [
        {
          name: familyMember1NameValue,
          bond: familyMember1bondValue
        },
        {
          name: familyMember2NameValue,
          bond: familyMember2bondValue
        },
        {
          name: familyMember3NameValue,
          bond: familyMember3bondValue
        },
        {
          name: familyMember4NameValue,
          bond: familyMember4bondValue
        }
      ],
      availability: [
        {
          monday: 'Monday',
          available: availabilityCheckMondayValue,
          from: availabilityFromMondayValue,
          to: availabilityToMondayValue
        },
        {
          Tuesday: 'Tuesday',
          available: availabilityCheckTuesdayValue,
          from: availabilityFromTuesdayValue,
          to: availabilityToTuesdayValue
        },
        {
          Wednesday: 'Wednesday',
          available: availabilityCheckWednesdayValue,
          from: availabilityFromWednesdayValue,
          to: availabilityToWednesdayValue
        },
        {
          Thursday: 'Thursday',
          available: availabilityCheckThursdayValue,
          from: availabilityFromThursdayValue,
          to: availabilityToThursdayValue
        },
        {
          Friday: 'Friday',
          available: availabilityCheckFridayValue,
          from: availabilityFromFridayValue,
          to: availabilityToFridayValue
        },
        {
          Saturday: 'Saturday',
          available: availabilityCheckSaturdayValue,
          from: availabilityFromSaturdayValue,
          to: availabilityToSaturdayValue
        },
        {
          Sunday: 'Sunday',
          available: availabilityCheckSundayValue,
          from: availabilityFromSundayValue,
          to: availabilityToSundayValue
        }
      ]
    };
    if (postulantId) {
      dispatch(updatePostulant(postulantId, data)).then((response) => {
        if (response) {
          history.push('/postulants');
        }
      });
    } else {
      dispatch(addPostulant(data)).then((response) => {
        if (response) {
          history.push('/postulants');
        }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={submit}
        titleText="Save"
        spanObjectArray={[
          {
            span: 'Are you sure you want to save these changes?'
          }
        ]}
        leftButtonText="save"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={error}
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <div className={styles.header}>
        <h1>Edit your profile</h1>
        <div className={styles.imagePostulant}>
          <img
            className={styles.logoPostulant}
            src="http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg"
          />
        </div>
        <div className={styles.postulantName}>
          {`${selectedPostulant.firstName} ${selectedPostulant.lastName}`}
        </div>
        <div className={styles.postulantDetails}>
          {`${selectedPostulant.openToWork ? 'Open to Work' : 'Not Available to Work'}`}
        </div>
      </div>
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <div className={styles.sections}>
          <p>Personal information</p>
          <Input
            label="First Name"
            id="firstName"
            type="text"
            value={firstNameValue}
            onChange={onChangeFirstName}
            required
          />
          <Input
            label="Last Name"
            id="lastName"
            type="text"
            value={lastNameValue}
            onChange={onChangeLastName}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={emailValue}
            onChange={onChangeEmail}
            required
          />
          <Input
            label="Phone"
            id="phone"
            type="number"
            value={phoneValue}
            onChange={onChangePhone}
            required
          />
          <Input
            label="Date Of Birth"
            id="dateOfBirth"
            type="date"
            value={dateOfBirthValue}
            onChange={onChangeBirth}
            required
          />
          <Input
            label="Gender"
            id="gender"
            type="text"
            value={genderValue}
            onChange={onChangeGender}
            required
          />
          <Input
            label="City"
            id="city"
            type="text"
            value={cityValue}
            onChange={onChangeCity}
            required
          />
          <Input
            label="State"
            id="state"
            type="text"
            value={stateValue}
            onChange={onChangeState}
            required
          />
          <Input
            label="Country"
            id="country"
            type="text"
            value={countryValue}
            onChange={onChangeCountry}
            required
          />
        </div>
        <div className={styles.sections}>
          <p>Academic Information</p>
          <Input
            label="Elementary School"
            id="elementarySchool"
            type="text"
            value={elementarySchoolNameValue}
            onChange={onChangeSchoolName}
          />
          <Input
            label="Degree"
            id="elementarySchoolDegree"
            type="text"
            value={elementarySchoolDegreeValue}
            onChange={onChangeSchoolDegree}
          />
          <Input
            label="Graduate Year"
            id="elementarySchoolGraduateYear"
            type="text"
            value={elementarySchoolGraduateYearValue}
            onChange={onChangeSchoolGraduateYear}
          />
          <Input
            label="High School"
            id="highSchool"
            type="text"
            value={highSchoolNameValue}
            onChange={onChangeHighSchool}
          />
          <Input
            label="Degree"
            id="highSchoolDegree"
            type="text"
            value={highSchoolDegreeValue}
            onChange={onChangeHighSchoolDegree}
          />
          <Input
            label="Graduate Year"
            id="highSchoolGraduateYear"
            type="text"
            value={highSchoolGraduateYearValue}
            onChange={onChangeHighSchoolGraduate}
          />
          <Input
            label="Junior College"
            id="juniorCollege"
            type="text"
            value={juniorCollegeNameValue}
            onChange={onChangeJuniorCollege}
          />
          <Input
            label="Degree"
            id="juniorCollegeDegree"
            type="text"
            value={juniorCollegeDegreeValue}
            onChange={onChangeJuniorCollegeDegree}
          />
          <Input
            label="Graduate Year"
            id="juniorCollegeGraduateYear"
            type="text"
            value={juniorCollegeGraduateYearValue}
            onChange={onChangeJuniorCollegeGraduate}
          />
          <Input
            label="University"
            id="University"
            type="text"
            value={universityNameValue}
            onChange={onChangeUniversity}
          />
          <Input
            label="Degree"
            id="UniversityDegree"
            type="text"
            value={universityDegreeValue}
            onChange={onChangeUniversityDegree}
          />
          <Input
            label="Graduate Year"
            id="UniversityGraduateYear"
            type="text"
            value={universityGraduateYearValue}
            onChange={onChangeUniversityGraduate}
          />
        </div>
        <div className={styles.sections}>
          <p>Work experience information</p>
          <Input
            label="Title"
            id="workExperience"
            type="text"
            value={workExperienceTitleValue}
            onChange={onChangeWorkExperience}
          />
          <Input
            label="Started"
            id="WorkExpStarted"
            type="date"
            value={workExperienceStartValue}
            onChange={onChangeWorkExperienceStart}
          />
          <Input
            label="Ended"
            id="WorkExpEnded"
            type="date"
            value={workExperienceEndValue}
            onChange={onChangeWorkExperienceEnd}
          />
          <Input
            label="Company"
            id="WorkExpClient"
            type="text"
            value={workExperienceClientValue}
            onChange={onChangeWorkExperienceClient}
          />
          <Input
            label="Description"
            id="workExpDescription"
            type="textarea"
            value={workExperienceDescriptionValue}
            onChange={onChangeWorkExperienceDescription}
          />
          <Input
            label="Description"
            id="profTrainDescription"
            type="text"
            value={profTrainingDescriptionValue}
            onChange={onChangeProfTrainingDescription}
          />
          <Input
            label="Year"
            id="profTrainStarted"
            type="number"
            value={profTrainingYearValue}
            onChange={onChangeProfTrainingYear}
          />
        </div>
        <div className={styles.sections}>
          <p>Data of interest</p>
          <Input
            label="Open to work"
            type="checkbox"
            id="openToWork"
            checked={openToWork}
            onChange={onChangeOpenToWork}
          />
          <Input
            label="Languages"
            id="languages"
            type="text"
            value={languagesValue}
            onChange={onChangeLanguages}
          />
          <Input
            label="Hobbies"
            id="hobbies"
            type="text"
            value={hobbiesValue}
            onChange={onChangeHobbies}
          />
          <Input
            label="1st family member name"
            id="1stFMName"
            type="text"
            value={familyMember1NameValue}
            onChange={onChangeFamlilyMember1Name}
          />
          <Input
            label="Bond"
            id="1stFMBond"
            type="text"
            value={familyMember1bondValue}
            onChange={onChangeFamlilyMember1Bond}
          />
          <Input
            label="2st family member name"
            id="2stFMName"
            type="text"
            value={familyMember2NameValue}
            onChange={onChangeFamlilyMember2Name}
          />
          <Input
            label="Bond"
            id="2stFMBond"
            type="text"
            value={familyMember2bondValue}
            onChange={onChangeFamlilyMember2Bond}
          />
          <Input
            label="3st family member name"
            id="3stFMName"
            type="text"
            value={familyMember3NameValue}
            onChange={onChangeFamlilyMember3Name}
          />
          <Input
            label="Bond"
            id="3stFMBond"
            type="text"
            value={familyMember3bondValue}
            onChange={onChangeFamlilyMember3Bond}
          />
          <Input
            label="4st family member name"
            id="4stFMName"
            type="text"
            value={familyMember4NameValue}
            onChange={onChangeFamlilyMember4Name}
          />
          <Input
            label="bond"
            id="4stFMBond"
            type="text"
            value={familyMember4bondValue}
            onChange={onChangeFamlilyMember4Bond}
          />
        </div>
        <div className={styles.sections}>
          <p>Availability</p>
          <Input
            label="Monday"
            type="checkbox"
            id="mondayDay1"
            checked={availabilityCheckMondayValue}
            onChange={onChangeMonday}
          />
          <Input
            label="from"
            id="fromDay1"
            type="text"
            value={availabilityFromMondayValue}
            onChange={onChangeMondayFrom}
          />
          <Input
            label="To"
            id="ToDay1"
            type="text"
            value={availabilityToMondayValue}
            onChange={onChangeMondayTo}
          />
          <Input
            label="Tuesday"
            type="checkbox"
            id="tuesdayDay2"
            checked={availabilityCheckTuesdayValue}
            onChange={onChangeTuesday}
          />
          <Input
            label="from"
            id="fromDay2"
            type="text"
            value={availabilityFromTuesdayValue}
            onChange={onChangeTuesdayFrom}
          />
          <Input
            label="To"
            id="ToDay2"
            type="text"
            value={availabilityToTuesdayValue}
            onChange={onChangeTuesdayTo}
          />
          <Input
            label="Wednesday"
            type="checkbox"
            id="WednesdayDay3"
            checked={availabilityCheckWednesdayValue}
            onChange={onChangeWednesday}
          />
          <Input
            label="from"
            id="fromDay3"
            type="text"
            value={availabilityFromWednesdayValue}
            onChange={onChangeWednesdayFrom}
          />
          <Input
            label="To"
            id="ToDay3"
            type="text"
            value={availabilityToWednesdayValue}
            onChange={onChangeWednesdayTo}
          />
          <Input
            label="Thursday"
            type="checkbox"
            id="ThursdayDay4"
            checked={availabilityCheckThursdayValue}
            onChange={onChangeThursday}
          />
          <Input
            label="from"
            id="fromDay4"
            type="text"
            value={availabilityFromThursdayValue}
            onChange={onChangeThursdayFrom}
          />
          <Input
            label="To"
            id="ToDay4"
            type="text"
            value={availabilityToThursdayValue}
            onChange={onChangeThursdayTo}
          />
          <Input
            label="Friday"
            type="checkbox"
            id="FridayDay5"
            checked={availabilityCheckFridayValue}
            onChange={onChangeFriday}
          />
          <Input
            label="from"
            id="fromDay5"
            type="text"
            value={availabilityFromFridayValue}
            onChange={onChangeFridayFrom}
          />
          <Input
            label="To"
            id="ToDay5"
            type="text"
            value={availabilityToFridayValue}
            onChange={onChangeFridayTo}
          />
          <Input
            label="Saturday"
            type="checkbox"
            id="SaturdayDay6"
            checked={availabilityCheckSaturdayValue}
            onChange={onChangeSaturday}
          />
          <Input
            label="from"
            id="fromDay6"
            type="text"
            value={availabilityFromSaturdayValue}
            onChange={onChangeSaturdayFrom}
          />
          <Input
            label="To"
            id="ToDay6"
            type="text"
            value={availabilityToSaturdayValue}
            onChange={onChangeSaturdayTo}
          />
          <Input
            label="Sunday"
            type="checkbox"
            id="SundayDay7"
            checked={availabilityCheckSundayValue}
            onChange={onChangeSunday}
          />
          <Input
            label="from"
            id="fromDay7"
            type="text"
            value={availabilityFromSundayValue}
            onChange={onChangeSundayFrom}
          />
          <Input
            label="To"
            id="ToDay7"
            type="text"
            value={availabilityToSundayValue}
            onChange={onChangeSundayTo}
          />
        </div>
        <SaveButton type="submit" />
      </form>
    </div>
  );
};

export default PostulantsForm;
