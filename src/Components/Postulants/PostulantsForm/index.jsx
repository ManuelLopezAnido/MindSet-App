import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';
import Modal from '../../Shared/Modal';

const params = new URLSearchParams(window.location.search);
const postulantId = params.get('_id');

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
  const [workExperienceCompanyValue, setWorkExperienceCompanyValue] = useState('');
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

  if (postulantId) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/postulants/${postulantId}`)
        .then((response) => response.json())
        .then((response) => {
          onLoading(response);
        })
        .catch((error) => error);
    }, []);
  }

  const onLoading = (data) => {
    setFirstNameValue(data.firstName || '-');
    setLastNameValue(data.lastName || '-');
    setEmailValue(data.email || '-');
    setPhoneValue(data.phone || 123456789);
    setDateOfBirthValue(data.dateOfBirth || '-');
    setGenderValue(data.gender || '-');
    setCityValue(data.city || '-');
    setStateValue(data.state || '-');
    setCountryValue(data.country || '-');

    setElementarySchoolNameValue(data.elementarySchool[0]?.name || '-');
    setElementarySchoolDegreeValue(data.elementarySchool[0]?.degree || '-');
    setElementarySchoolGraduateYearValue(data.elementarySchool[0]?.graduateYear || 0);

    setHighSchoolNameValue(data.highSchool[0]?.name || '-');
    setHighSchoolDegreeValue(data.highSchool[0]?.degree || '-');
    setHighSchoolGraduateYearValue(data.highSchool[0]?.graduateYear || 0);

    setJuniorCollegeNameValue(data.juniorCollege[0]?.name || '-');
    setJuniorCollegeDegreeValue(data.juniorCollege[0]?.degree || '-');
    setJuniorCollegeGraduateYearValue(data.juniorCollege[0]?.graduateYear || 0);

    setUniversityNameValue(data.university[0]?.name || '-');
    setUniversityDegreeValue(data.university[0]?.degree || '-');
    setUniversityGraduateYearValue(data.university[0]?.graduateYear || 0);

    setOpenToWork(data.openToWork);

    setWorkExperienceTitleValue(data.workExperience[0]?.title || '-');
    setWorkExperienceStartValue(data.workExperience[0]?.start || '2000-05-20');
    setWorkExperienceEndValue(data.workExperience[0]?.end || '2000-02-20');
    setWorkExperienceCompanyValue(data.workExperience[0]?.company || '-');
    setWorkExperienceDescriptionValue(data.workExperience[0]?.description || '-');

    setProfTrainingDescriptionValue(data.professionalTraining[0]?.description || '-');
    setProfTrainingYearValue(data.professionalTraining[0]?.year || 0);

    setLanguagesValue(data.languages || '');
    setHobbiesValue(data.hobbies || '');

    setFamilyMember1NameValue(data.familyMembers[0]?.name || '-');
    setFamilyMember1bondValue(data.familyMembers[0]?.bond || '-');

    setFamilyMember2NameValue(data.familyMembers[1]?.name || '-');
    setFamilyMember2bondValue(data.familyMembers[1]?.bond || '-');

    setFamilyMember3NameValue(data.familyMembers[2]?.name || '-');
    setFamilyMember3bondValue(data.familyMembers[2]?.bond || '-');

    setFamilyMember4NameValue(data.familyMembers[3]?.name || '-');
    setFamilyMember4bondValue(data.familyMembers[3]?.bond || '-');

    setAvailabilityCheckMondayValue(data.availability[0]?.available);
    setAvailabilityFromMondayValue(data.availability[0]?.from || '-');
    setAvailabilityToMondayValue(data.availability[0]?.to || '-');

    setAvailabilityCheckTuesdayValue(data.availability[1]?.available);
    setAvailabilityFromTuesdayValue(data.availability[1]?.from || '-');
    setAvailabilityToTuesdayValue(data.availability[1]?.to || '-');

    setAvailabilityCheckWednesdayValue(data.availability[2]?.available);
    setAvailabilityFromWednesdayValue(data.availability[2]?.from || '-');
    setAvailabilityToWednesdayValue(data.availability[2]?.to || '-');

    setAvailabilityCheckThursdayValue(data.availability[3]?.available);
    setAvailabilityFromThursdayValue(data.availability[3]?.from || '-');
    setAvailabilityToThursdayValue(data.availability[3]?.to || '-');

    setAvailabilityCheckFridayValue(data.availability[4]?.available);
    setAvailabilityFromFridayValue(data.availability[4]?.from || '-');
    setAvailabilityToFridayValue(data.availability[4]?.to || '-');

    setAvailabilityCheckSaturdayValue(data.availability[5]?.available);
    setAvailabilityFromSaturdayValue(data.availability[5]?.from || '-');
    setAvailabilityToSaturdayValue(data.availability[5]?.to || '-');

    setAvailabilityCheckSundayValue(data.availability[6]?.available);
    setAvailabilityFromSundayValue(data.availability[6]?.from || '-');
    setAvailabilityToSundayValue(data.availability[6]?.to || '-');
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
          company: workExperienceCompanyValue,
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

    let url;
    postulantId
      ? (url = `${process.env.REACT_APP_API}/postulants/update/${postulantId}`)
      : (url = `${process.env.REACT_APP_API}/postulants/add`);

    return fetch(url, {
      method: postulantId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = `${window.location.origin}/postulants`;
      })
      .catch((error) => error)
      .finally(() => setShowModal(false));
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={submit}
        titleText="Save"
        spanObjectArray={[
          {
            span: 'are you sure you want to save these changes?'
          }
        ]}
        leftButtonText="save"
        rightButtonText="cancel"
      />
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <h2>
          {firstNameValue} {lastNameValue}
        </h2>
        <div className={styles.generalInformation}>
          <h3>General Information</h3>
          <Input
            label="firstName"
            id="firstName"
            type="text"
            value={firstNameValue}
            setValue={setFirstNameValue}
            required
          />
          <Input
            label="lastName"
            id="lastName"
            type="text"
            value={lastNameValue}
            setValue={setLastNameValue}
            required
          />
          <Input
            label="email"
            id="email"
            type="email"
            value={emailValue}
            setValue={setEmailValue}
            required
          />
          <Input
            label="phone"
            id="phone"
            type="number"
            value={phoneValue}
            setValue={setPhoneValue}
            required
          />
          <Input
            label="dateOfBirth"
            id="dateOfBirth"
            type="date"
            value={dateOfBirthValue}
            setValue={setDateOfBirthValue}
            required
          />
          <Input
            label="gender"
            id="gender"
            type="text"
            value={genderValue}
            setValue={setGenderValue}
            required
          />
          <Input
            label="city"
            id="city"
            type="text"
            value={cityValue}
            setValue={setCityValue}
            required
          />
          <Input
            label="state"
            id="state"
            type="text"
            value={stateValue}
            setValue={setStateValue}
            required
          />
          <Input
            label="country"
            id="country"
            type="text"
            value={countryValue}
            setValue={setCountryValue}
            required
          />
        </div>
        <div className={styles.studies}>
          <h3>Studies</h3>
          <h4>Elementary School</h4>
          <Input
            label="Name"
            id="elementarySchool"
            type="text"
            value={elementarySchoolNameValue}
            setValue={setElementarySchoolNameValue}
          />
          <Input
            label="Degree"
            id="elementarySchoolDegree"
            type="text"
            value={elementarySchoolDegreeValue}
            setValue={setElementarySchoolDegreeValue}
          />
          <Input
            label="Graduate Year"
            id="elementarySchoolGraduateYear"
            type="text"
            value={elementarySchoolGraduateYearValue}
            setValue={setElementarySchoolGraduateYearValue}
          />
          <h4>High School</h4>
          <Input
            label="Name"
            id="highSchool"
            type="text"
            value={highSchoolNameValue}
            setValue={setHighSchoolNameValue}
          />
          <Input
            label="Degree"
            id="highSchoolDegree"
            type="text"
            value={highSchoolDegreeValue}
            setValue={setHighSchoolDegreeValue}
          />
          <Input
            label="Graduate Year"
            id="highSchoolGraduateYear"
            type="text"
            value={highSchoolGraduateYearValue}
            setValue={setHighSchoolGraduateYearValue}
          />
          <h4>Junior College</h4>
          <Input
            label="Name"
            id="juniorCollege"
            type="text"
            value={juniorCollegeNameValue}
            setValue={setJuniorCollegeNameValue}
          />
          <Input
            label="Degree"
            id="juniorCollegeDegree"
            type="text"
            value={juniorCollegeDegreeValue}
            setValue={setJuniorCollegeDegreeValue}
          />
          <Input
            label="Graduate Year"
            id="juniorCollegeGraduateYear"
            type="text"
            value={juniorCollegeGraduateYearValue}
            setValue={setJuniorCollegeGraduateYearValue}
          />
          <h4>University</h4>
          <Input
            label="Name"
            id="University"
            type="text"
            value={universityNameValue}
            setValue={setUniversityNameValue}
          />
          <Input
            label="Degree"
            id="UniversityDegree"
            type="text"
            value={universityDegreeValue}
            setValue={setUniversityDegreeValue}
          />
          <Input
            label="Graduate Year"
            id="UniversityGraduateYear"
            type="text"
            value={universityGraduateYearValue}
            setValue={setUniversityGraduateYearValue}
          />
        </div>
        <div className={styles.openForWork}>
          <h3>
            Open for Work
            <input
              type="checkbox"
              id="openToWork"
              checked={openToWork}
              onChange={(event) => setOpenToWork(event.target.checked)}
            />
          </h3>
          <label htmlFor="openToWork" />
        </div>
        <div className={styles.workExperience}>
          <h3>Work Experience</h3>
          <Input
            label="Title"
            id="workExperience"
            type="text"
            value={workExperienceTitleValue}
            setValue={setWorkExperienceTitleValue}
          />
          <Input
            label="Started"
            id="WorkExpStarted"
            type="date"
            value={workExperienceStartValue}
            setValue={setWorkExperienceStartValue}
          />
          <Input
            label="Ended"
            id="WorkExpEnded"
            type="date" //HERE
            value={workExperienceEndValue}
            setValue={setWorkExperienceEndValue}
          />
          <Input
            label="Company"
            id="WorkExpCompany"
            type="text"
            value={workExperienceCompanyValue}
            setValue={setWorkExperienceCompanyValue}
          />
          <Input
            label="Description"
            id="workExpDescription"
            type="textarea"
            value={workExperienceDescriptionValue}
            setValue={setWorkExperienceDescriptionValue}
          />
        </div>
        <div className={styles.professionalTraining}>
          <h3>Professional Training</h3>
          <Input
            label="Description"
            id="profTrainDescription"
            type="text"
            value={profTrainingDescriptionValue}
            setValue={setProfTrainingDescriptionValue}
          />
          <Input
            label="Year"
            id="profTrainStarted"
            type="number"
            value={profTrainingYearValue}
            setValue={setProfTrainingYearValue}
          />
        </div>
        <Input
          label="Languages"
          id="languages"
          type="text"
          value={languagesValue}
          setValue={setLanguagesValue}
        />
        <Input
          label="Hobbies"
          id="hobbies"
          type="text"
          value={hobbiesValue}
          setValue={setHobbiesValue}
        />
        <div className={styles.family}>
          <h3>Family</h3>
          <div>
            <Input
              label="1st family member name"
              id="1stFMName"
              type="text"
              value={familyMember1NameValue}
              setValue={setFamilyMember1NameValue}
            />
            <Input
              label="bond"
              id="1stFMBond"
              type="text"
              value={familyMember1bondValue}
              setValue={setFamilyMember1bondValue}
            />
          </div>
          <div>
            <Input
              label="2st family member name"
              id="2stFMName"
              type="text"
              value={familyMember2NameValue}
              setValue={setFamilyMember2NameValue}
            />
            <Input
              label="bond"
              id="2stFMBond"
              type="text"
              value={familyMember2bondValue}
              setValue={setFamilyMember2bondValue}
            />
          </div>
          <div>
            <Input
              label="3st family member name"
              id="3stFMName"
              type="text"
              value={familyMember3NameValue}
              setValue={setFamilyMember3NameValue}
            />
            <Input
              label="bond"
              id="3stFMBond"
              type="text"
              value={familyMember3bondValue}
              setValue={setFamilyMember3bondValue}
            />
          </div>
          <div>
            <Input
              label="4st family member name"
              id="4stFMName"
              type="text"
              value={familyMember4NameValue}
              setValue={setFamilyMember4NameValue}
            />
            <Input
              label="bond"
              id="4stFMBond"
              type="text"
              value={familyMember4bondValue}
              setValue={setFamilyMember4bondValue}
            />
          </div>
        </div>
        <div className={styles.availability}>
          <h3>Availability</h3>
          <div>
            <label htmlFor="mondayDay1" /> Mondays
            <input
              type="checkbox"
              id="mondayDay1"
              checked={availabilityCheckMondayValue}
              onChange={(event) => setAvailabilityCheckMondayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay1"
              type="text"
              value={availabilityFromMondayValue}
              setValue={setAvailabilityFromMondayValue}
            />
            <Input
              label="To"
              id="ToDay1"
              type="text"
              value={availabilityToMondayValue}
              setValue={setAvailabilityToMondayValue}
            />
          </div>
          <div>
            <label htmlFor="tuesdayDay2" /> Tuesdays
            <input
              type="checkbox"
              id="tuesdayDay2"
              checked={availabilityCheckTuesdayValue}
              onChange={(event) => setAvailabilityCheckTuesdayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay2"
              type="text"
              value={availabilityFromTuesdayValue}
              setValue={setAvailabilityFromTuesdayValue}
            />
            <Input
              label="To"
              id="ToDay2"
              type="text"
              value={availabilityToTuesdayValue}
              setValue={setAvailabilityToTuesdayValue}
            />
          </div>
          <div>
            <label htmlFor="WednesdayDay3" /> Wednesdays
            <input
              type="checkbox"
              id="WednesdayDay3"
              checked={availabilityCheckWednesdayValue}
              onChange={(event) => setAvailabilityCheckWednesdayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay3"
              type="text"
              value={availabilityFromWednesdayValue}
              setValue={setAvailabilityFromWednesdayValue}
            />
            <Input
              label="To"
              id="ToDay3"
              type="text"
              value={availabilityToWednesdayValue}
              setValue={setAvailabilityToWednesdayValue}
            />
          </div>
          <div>
            <label htmlFor="ThursdayDay4" /> Thursdays
            <input
              type="checkbox"
              id="ThursdayDay4"
              checked={availabilityCheckThursdayValue}
              onChange={(event) => setAvailabilityCheckThursdayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay4"
              type="text"
              value={availabilityFromThursdayValue}
              setValue={setAvailabilityFromThursdayValue}
            />
            <Input
              label="To"
              id="ToDay4"
              type="text"
              value={availabilityToThursdayValue}
              setValue={setAvailabilityToThursdayValue}
            />
          </div>
          <div>
            <label htmlFor="FridayDay5" /> Fridays
            <input
              type="checkbox"
              id="FridayDay5"
              checked={availabilityCheckFridayValue}
              onChange={(event) => setAvailabilityCheckFridayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay5"
              type="text"
              value={availabilityFromFridayValue}
              setValue={setAvailabilityFromFridayValue}
            />
            <Input
              label="To"
              id="ToDay5"
              type="text"
              value={availabilityToFridayValue}
              setValue={setAvailabilityToFridayValue}
            />
          </div>
          <div>
            <label htmlFor="SaturdayDay6" /> Saturdays
            <input
              type="checkbox"
              id="SaturdayDay6"
              checked={availabilityCheckSaturdayValue}
              onChange={(event) => setAvailabilityCheckSaturdayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay6"
              type="text"
              value={availabilityFromSaturdayValue}
              setValue={setAvailabilityFromSaturdayValue}
            />
            <Input
              label="To"
              id="ToDay6"
              type="text"
              value={availabilityToSaturdayValue}
              setValue={setAvailabilityToSaturdayValue}
            />
          </div>
          <div>
            <label htmlFor="SundayDay7" /> Sundays
            <input
              type="checkbox"
              id="SundayDay7"
              checked={availabilityCheckSundayValue}
              onChange={(event) => setAvailabilityCheckSundayValue(event.target.checked)}
            />
            <Input
              label="from"
              id="fromDay7"
              type="text"
              value={availabilityFromSundayValue}
              setValue={setAvailabilityFromSundayValue}
            />
            <Input
              label="To"
              id="ToDay7"
              type="text"
              value={availabilityToSundayValue}
              setValue={setAvailabilityToSundayValue}
            />
          </div>
        </div>
        <div className={styles.formButton}>
          {postulantId ? (
            <button type="submit">Edit</button>
          ) : (
            <button type="submit">Add postulant</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostulantsForm;
