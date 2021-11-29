import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';
import Input from '../Input';

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
  const [HighSchoolGraduateYearValue, setHighSchoolGraduateYearValue] = useState(0);

  const [juniorCollegeNameValue, setJuniorCollegeNameValue] = useState('');
  const [juniorCollegeDegreeValue, setJuniorCollegeDegreeValue] = useState('');
  const [juniorCollegeGraduateYearValue, setJuniorCollegeGraduateYearValue] = useState(0);

  const [universityNameValue, setUniversityNameValue] = useState('');
  const [universityDegreeValue, setUniversityDegreeValue] = useState('');
  const [universityGraduateYearValue, setUniversityGraduateYearValue] = useState(0);

  const [openToWork, setOpenToWork] = useState('');

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

  const [availabilityFromValue, setAvailabilityFromValue] = useState('-');
  const [availabilityToValue, setAvailabilityToValue] = useState('-');
  // const [availabilityDay1Value, setAvailabilityDay1Value] = useState('-');
  // const [availabilityDay2Value, setAvailabilityDay2Value] = useState('-');
  // const [availabilityDay3Value, setAvailabilityDay3Value] = useState('-');
  // const [availabilityDay4Value, setAvailabilityDay4Value] = useState('-');
  // const [availabilityDay5Value, setAvailabilityDay5Value] = useState('-');

  if (postulantId) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/api/postulants/${postulantId}`)
        .then((response) => response.json())
        .then((response) => {
          onLoading(response);
        });
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

    setElementarySchoolNameValue(data.elementarySchool?.name || '-');
    setElementarySchoolDegreeValue(data.elementarySchool?.degree || '-');
    setElementarySchoolGraduateYearValue(data.elementarySchool?.graduateYear || 0);

    setHighSchoolNameValue(data.highSchool?.name || '-');
    setHighSchoolDegreeValue(data.highSchool?.degree || '-');
    setHighSchoolGraduateYearValue(data.highSchool?.graduateYear || 0);

    setJuniorCollegeNameValue(data.juniorCollege?.name || '-');
    setJuniorCollegeDegreeValue(data.juniorCollege?.degree || '-');
    setJuniorCollegeGraduateYearValue(data.juniorCollege?.graduateYear || 0);

    setUniversityNameValue(data.university?.name || '-');
    setUniversityDegreeValue(data.university?.degree || '-');
    setUniversityGraduateYearValue(data.university?.graduateYear || 0);

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

    setAvailabilityFromValue(data.from || '');
    setAvailabilityToValue(data.to || '');
    // setAvailabilityDay1Value(data.availability?.day[0] || '-');
    // setAvailabilityDay2Value(data.availability?.day[1] || '-');
    // setAvailabilityDay3Value(data.availability?.day[2] || '-');
    // setAvailabilityDay4Value(data.availability?.day[3] || '-');
    // setAvailabilityDay5Value(data.availability?.day[4] || '-');
  };

  const onSubmit = (event) => {
    event.preventDefault();
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
      elementarySchool: {
        name: elementarySchoolNameValue,
        degree: elementarySchoolDegreeValue,
        graduateYear: elementarySchoolGraduateYearValue
      },
      highSchool: {
        name: highSchoolNameValue,
        degree: highSchoolDegreeValue,
        graduateYear: HighSchoolGraduateYearValue
      },
      juniorCollege: {
        name: juniorCollegeNameValue,
        degree: juniorCollegeDegreeValue,
        graduateYear: juniorCollegeGraduateYearValue
      },
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
      availability: {
        from: availabilityFromValue,
        to: availabilityToValue
        // day: [
        //   availabilityDay1Value,
        //   availabilityDay2Value,
        //   availabilityDay3Value,
        //   availabilityDay4Value,
        //   availabilityDay5Value
        // ]
      }
    };

    let url;
    postulantId
      ? (url = `${process.env.REACT_APP_API}/api/postulants/update/${postulantId}`)
      : (url = `${process.env.REACT_APP_API}/api/postulants/add`);

    return fetch(url, {
      method: postulantId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response fetch: ', response);
      })
      .catch((error) => {
        console.log('error catch: ', error);
      });
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onShowModal = (event, id, firstName, lastName) => {
    event.stopPropagation();
    setShowModal(true);
    // setIdToDelete(id);
    // setFirstNameToDelete(firstName);
    // setLastNameToDelete(lastName);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        // actionPostulant={deletePostulant}
        // idToUse={idToDelete}
        titleText="Warning"
        warningText="you are about to delete a postulant"
        buttonText="delete"
        text="Are you sure you want to delete"
        // firstName={firstNameToDelete}
        // lastName={lastNameToDelete}
      />
      <h2>
        {firstNameValue} {lastNameValue}
      </h2>
      <form action="" className={styles.form} onSubmit={onSubmit}>
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
        <Input label="phone" id="phone" type="tel" value={phoneValue} setValue={setPhoneValue} />
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
        <div className={styles.studies}>
          <h3>Studies</h3>
          <div>
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
          </div>
          <div>
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
              value={HighSchoolGraduateYearValue}
              setValue={setHighSchoolGraduateYearValue}
            />
          </div>
          <div>
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
          </div>
          <div>
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
        </div>
        <div>
          <h3>Open for Work</h3>
          <label htmlFor="openToWork" />
          <input
            type="checkbox"
            id="openToWork"
            checked={openToWork}
            onChange={(event) => setOpenToWork(event.target.checked)}
          />
        </div>
        <div>
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
            type="date"
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
        <div>
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
        <div>
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
        <div>
          <h3>Availability</h3>
          <Input
            label="from"
            id="from"
            type="text"
            value={availabilityFromValue}
            setValue={setAvailabilityFromValue}
          />
          <Input
            label="To"
            id="To"
            type="text"
            value={availabilityToValue}
            setValue={setAvailabilityToValue}
          />
          {/* <label htmlFor="availability1" /> Monday
          <input
            type="radio"
            id="availability1"
            checked={availabilityDay1Value === 'Mondays'}
            value="Mondays"
            onChange={(event) => setAvailabilityDay1Value(event.target.value)}
          />
          <label htmlFor="availability2" /> Tuesday
          <input
            type="radio"
            id="availability2"
            checked={availabilityDay2Value === 'Tuesdays'}
            value="Tuesdays"
            onChange={(event) => setAvailabilityDay2Value(event.target.value)}
          />
          <label htmlFor="availability3" /> Wednesday
          <input
            type="radio"
            id="availability3"
            checked={availabilityDay3Value === 'Wednesdays'}
            value="Wednesdays"
            onChange={(event) => setAvailabilityDay3Value(event.target.value)}
          />
          <label htmlFor="availability4" /> Thursday
          <input
            type="radio"
            id="availability4"
            checked={availabilityDay4Value === 'Thursdays'}
            value="Thursdays"
            onChange={(event) => setAvailabilityDay4Value(event.target.value)}
          />
          <label htmlFor="availability5" /> Friday
          <input
            type="radio"
            id="availability5"
            checked={availabilityDay5Value === 'Fridays'}
            value="Fridays"
            onChange={(event) => setAvailabilityDay5Value(event.target.value)}
          /> */}
        </div>
        {postulantId ? (
          <button type="submit" onClick={(event) => onShowModal(event)}>
            Edit
          </button>
        ) : (
          <button type="submit">Add postulant</button>
        )}
      </form>
    </div>
  );
};

// onShowModal(event, postulant._id, postulant.firstName, postulant.lastName)
// firstName: "Lolita flor"
// lastName: "Pepe"
// openToWork: true
// country: "Argentina"
// state: "Entre rios"
// city: "concordia"
// dateOfBirth: "726352346"
// gender: ""
// phone: 23435643
// email: "lolipepe@gmail.com"
// availability: {from: "", to: "", day: [""]}
// elementarySchool: {name: "undefined", graduateYear: null}
// highSchool: {name: "undefined", graduateYear: null}
// juniorCollege: {name: "undefined", graduateYear: null}
// university: [{name: "undefined", degree: "undefined", graduateYear: null, _id: "619d537966f57a527a596ca4"}]
// professionalTraining: [{description: "undefined", year: null, _id: "619d537966f57a527a596ca6"}]
// workExperience: [{title: "", start: "", end: "", company: "undefined", description: "undefined",…}]
// languages: ["sadsad", "asdas"]
// familyMembers: [{name: "", bond: "", _id: "619d537966f57a527a596ca7"},…]
// hobbies: [""]
// __v: 0

export default PostulantsForm;
