import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Error from '../Error';
import Button from '../Button';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';
import { getOneCounselor, addCounselor, updateCounselor } from '../../../redux/counselors/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from '../../../redux/counselors/actions';
import { useHistory } from 'react-router-dom';

const CouncelorsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState([]);
  const [lastNameValue, setLastNameValue] = useState([]);
  const [emailValue, setEmailValue] = useState([]);
  const [genderValue, setGenderValue] = useState([]);
  const [adressValue, setAdressValue] = useState([]);
  const [birthdayValue, setBirthdayValue] = useState([]);
  const [cityValue, setCityValue] = useState([]);
  const [countryValue, setCountryValue] = useState([]);
  const [phoneValue, setPhoneValue] = useState([]);
  const [mondayValue, setMondayValue] = useState(false);
  const [mondayFromValue, setMondayFromValue] = useState([]);
  const [mondayToValue, setMondayToValue] = useState([]);
  const [tuesdayValue, setTuesdayValue] = useState(false);
  const [tuesdayFromValue, setTuesdayFromValue] = useState([]);
  const [tuesdayToValue, setTuesdayToValue] = useState([]);
  const [wednesdayValue, setWednesdayValue] = useState(false);
  const [wednesdayFromValue, setWednesdayFromValue] = useState([]);
  const [wednesdayToValue, setWednesdayToValue] = useState([]);
  const [thursdayValue, setThursdayValue] = useState(false);
  const [thursdayFromValue, setThursdayFromValue] = useState([]);
  const [thursdayToValue, setThursdayToValue] = useState([]);
  const [fridayValue, setFridayValue] = useState(false);
  const [fridayFromValue, setFridayFromValue] = useState([]);
  const [fridayToValue, setFridayToValue] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.counselors.isLoading);
  const error = useSelector((store) => store.counselors.error);
  const errorMessage = useSelector((store) => store.counselors.errorMessage);

  const params = new URLSearchParams(window.location.search);
  const counselorId = params.get('id');

  if (counselorId) {
    useEffect(() => {
      dispatch(getOneCounselor(counselorId)).then((selected) => {
        setFirstNameValue(selected.firstName ?? '-');
        setLastNameValue(selected.lastName ?? '-');
        setEmailValue(selected.email ?? '-');
        setGenderValue(selected.gender ?? '-');
        setAdressValue(selected.address ?? '-');
        setBirthdayValue(selected.birthday ?? '-');
        setCityValue(selected.city ?? '-');
        setCountryValue(selected.country ?? '-');
        setPhoneValue(selected.phone ?? '-');
        setMondayValue(selected.availability?.day[0] ?? '-');
        setMondayFromValue(selected.lastName ?? '-');
        setMondayToValue(selected.lastName ?? '-');
        setTuesdayValue(selected.lastName ?? '-');
        setTuesdayFromValue(selected.lastName ?? '-');
        setTuesdayToValue(selected.lastName ?? '-');
        setWednesdayValue(selected.lastName ?? '-');
        setWednesdayFromValue(selected.lastName ?? '-');
        setWednesdayToValue(selected.lastName ?? '-');
        setThursdayValue(selected.lastName ?? '-');
        setThursdayFromValue(selected.lastName ?? '-');
        setThursdayToValue(selected.lastName ?? '-');
        setFridayValue(selected.lastName ?? '-');
        setFridayFromValue(selected.lastName ?? '-');
        setFridayToValue(selected.lastName ?? '-');
      });
    }, []);
  }

  const onChangeFirstNameInput = (event) => {
    setFirstNameValue(event.target.value);
  };

  const onChangeLastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };

  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangeGenderInput = (event) => {
    setGenderValue(event.target.value);
  };

  const onChangeAdressInput = (event) => {
    setAdressValue(event.target.value);
  };

  const onChangeBirthdayInput = (event) => {
    setBirthdayValue(event.target.value);
  };

  const onChangeCityInput = (event) => {
    setCityValue(event.target.value);
  };

  const onChangeCountryInput = (event) => {
    setCountryValue(event.target.value);
  };

  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };

  const onChangeAvailabilityMonday = (event) => {
    String(setMondayValue(event.target.value)) === true;
  };

  const onChangeFromMonday = (event) => {
    setMondayFromValue(event.target.value);
  };

  const onChangeToMonday = (event) => {
    setMondayToValue(event.target.value);
  };

  const onChangeAvailabilityTuesday = (event) => {
    setTuesdayValue(event.target.value);
  };

  const onChangeFromTuesday = (event) => {
    setTuesdayFromValue(event.target.value);
  };

  const onChangeToTuesday = (event) => {
    setTuesdayToValue(event.target.value);
  };

  const onChangeAvailabilityWednesday = (event) => {
    setWednesdayValue(event.target.value);
  };

  const onChangeFromWednesday = (event) => {
    setWednesdayFromValue(event.target.value);
  };

  const onChangeToWednesday = (event) => {
    setWednesdayToValue(event.target.value);
  };

  const onChangeAvailabilityThursday = (event) => {
    setThursdayValue(event.target.value);
  };

  const onChangeFromThursday = (event) => {
    setThursdayFromValue(event.target.value);
  };

  const onChangeToThursday = (event) => {
    setThursdayToValue(event.target.value);
  };

  const onChangeAvailabilityFriday = (event) => {
    setFridayValue(event.target.value);
  };

  const onChangeFromFriday = (event) => {
    setFridayFromValue(event.target.value);
  };

  const onChangeToFriday = (event) => {
    setFridayToValue(event.target.value);
  };

  const submit = () => {
    if (counselorId) {
      dispatch(
        updateCounselor(counselorId, {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          gender: genderValue,
          adress: adressValue,
          birthday: birthdayValue,
          city: cityValue,
          country: countryValue,
          phone: phoneValue,
          monday: mondayValue,
          mondayFrom: mondayFromValue,
          mondayTo: mondayToValue,
          tuesday: tuesdayValue,
          tuesdayFrom: tuesdayFromValue,
          tuesdayTo: tuesdayToValue,
          wednesday: wednesdayValue,
          wednesdayFrom: wednesdayFromValue,
          wednesdayTo: wednesdayToValue,
          thursday: thursdayValue,
          thursdayFrom: thursdayFromValue,
          thursdayTo: thursdayToValue,
          friday: fridayValue,
          fridayFrom: fridayFromValue,
          fridayTo: fridayToValue
        })
      ).then((response) => {
        if (response) {
          history.push('/counselors');
        }
      });
    } else {
      dispatch(
        addCounselor({
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          gender: genderValue,
          adress: adressValue,
          birthday: birthdayValue,
          city: cityValue,
          country: countryValue,
          phone: phoneValue,
          monday: mondayValue,
          mondayFrom: mondayFromValue,
          mondayTo: mondayToValue,
          tuesday: tuesdayValue,
          tuesdayFrom: tuesdayFromValue,
          tuesdayTo: tuesdayToValue,
          wednesday: wednesdayValue,
          wednesdayFrom: wednesdayFromValue,
          wednesdayTo: wednesdayToValue,
          thursday: thursdayValue,
          thursdayFrom: thursdayFromValue,
          thursdayTo: thursdayToValue,
          friday: fridayValue,
          fridayFrom: fridayFromValue
        })
      ).then((response) => {
        if (response) {
          history.push('/counselors');
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

  const hideEmail = () => {
    setEmailError(false);
    if (!emailValue.includes('@')) {
      setCanSave(true);
    }
  };

  const hideBirthday = () => {
    setBirthdayError(false);
    const exp =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    if (!exp.test(birthdayValue)) {
      setCanSave(true);
    }
  };

  const hidePhone = () => {
    setPhoneError(false);
    if (phoneValue.length < 8) {
      setCanSave(true);
    }
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setEmailError(true);
      setCanSave(true);
    }
  };

  const validateBirthday = (birthday) => {
    const exp =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    if (!exp.test(birthday)) {
      setBirthdayError(true);
      setCanSave(true);
    }
  };

  const validatePhone = (phone) => {
    if (phone.length < 8 || phone.includes('(') || phone.includes(')') || phone.includes('#')) {
      setPhoneError(true);
      setCanSave(true);
    }
  };

  const validateSave = () => {
    if (emailValue.length > 0 && birthdayValue.length === 0 && phoneValue.length === 0) {
      validateEmail(emailValue);
    } else if (emailValue.length == 0 && birthdayValue.length > 0 && phoneValue.length === 0) {
      validateBirthday(birthdayValue);
    } else if (emailValue.length === 0 && birthdayValue.length == 0 && phoneValue.length > 0) {
      validatePhone(phoneValue);
    } else if (emailValue.length > 0 && birthdayValue.length > 0 && phoneValue.length == 0) {
      validateEmail(emailValue);
      validateBirthday(birthdayValue);
    } else if (emailValue.length > 0 && birthdayValue.length == 0 && phoneValue.length > 0) {
      validateEmail(emailValue);
      validatePhone(phoneValue);
    } else if (emailValue.length == 0 && birthdayValue.length > 0 && phoneValue.length > 0) {
      validateBirthday(birthdayValue);
      validatePhone(phoneValue);
    } else if (emailValue.length > 0 && birthdayValue.length > 0 && phoneValue.length > 0) {
      validateBirthday(birthdayValue);
      validatePhone(phoneValue);
      validateEmail(emailValue);
      if (
        !emailError &&
        !birthdayError &&
        !phoneError &&
        emailValue.length > 0 &&
        birthdayValue.length > 0 &&
        phoneValue.length > 0 &&
        firstNameValue.length > 0 &&
        lastNameValue.length > 0 &&
        genderValue.length > 0 &&
        adressValue.length > 0 &&
        cityValue.length > 0 &&
        countryValue.length > 0
      ) {
        setCanSave(false);
      }
    }
  };

  if (isLoading) return <IsLoading />;

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
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          label="First Name"
          name="firstName"
          type="string"
          required
          className={styles.input}
          value={firstNameValue}
          onChange={onChangeFirstNameInput}
        />
        <Input
          label="Last Name"
          name="lastName"
          type="string"
          required
          className={styles.input}
          value={lastNameValue}
          onChange={onChangeLastNameInput}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          className={styles.input}
          value={emailValue}
          onChange={onChangeEmailInput}
          onBlur={validateSave}
          onFocus={hideEmail}
        />
        <Error showError={emailError} text={'Please enter a valid email'} />
        <Input
          label="Gender"
          name="gender"
          type="string"
          required
          className={styles.input}
          value={genderValue}
          onChange={onChangeGenderInput}
        />
        <Input
          label="Adress"
          name="adress"
          type="string"
          required
          className={styles.input}
          value={adressValue}
          onChange={onChangeAdressInput}
        />
        <Input
          label="Birthday"
          name="birthday"
          type="string"
          required
          className={styles.input}
          value={birthdayValue}
          onChange={onChangeBirthdayInput}
          onBlur={validateSave}
          onFocus={hideBirthday}
        />
        <Error showError={birthdayError} text={'Please enter a valid date (dd/mm/yyyy)'} />
        <Input
          label="City"
          name="city"
          type="string"
          required
          className={styles.input}
          value={cityValue}
          onChange={onChangeCityInput}
        />
        <Input
          label="Country"
          name="country"
          type="string"
          required
          value={countryValue}
          onChange={onChangeCountryInput}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          required
          value={phoneValue}
          onChange={onChangePhoneInput}
          onBlur={validateSave}
          onFocus={hidePhone}
        />
        <Error showError={phoneError} text={'Telephones with # () and blanks are not valid'} />
        <div className={styles.availabilityContainer}>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityMonday} className={styles.eachDay}>
              <Input label="Monday" type="checkbox" value={true} name="monday" />
            </div>
            <div>
              <Input
                label="From"
                name="fromMonday"
                type="string"
                value={mondayFromValue}
                onChange={onChangeFromMonday}
                disabled={!mondayValue}
              />
            </div>
            <div>
              <Input
                label="To"
                name="toMonday"
                type="string"
                value={mondayToValue}
                onChange={onChangeToMonday}
                disabled={!mondayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityTuesday} className={styles.eachDay}>
              <Input label="Tuesday" type="checkbox" value={true} name="tuesday" />
            </div>
            <div>
              <Input
                label="From"
                name="fromTuesday"
                type="string"
                value={tuesdayFromValue}
                onChange={onChangeFromTuesday}
                disabled={!tuesdayValue}
              />
            </div>
            <div>
              <Input
                label="To"
                name="toTuesday"
                type="string"
                value={tuesdayToValue}
                onChange={onChangeToTuesday}
                disabled={!tuesdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityWednesday} className={styles.eachDay}>
              <Input label="Wednesday" type="checkbox" value={true} name="wednesday" />
            </div>
            <div>
              <Input
                label="From"
                name="fromWednesday"
                type="string"
                value={wednesdayFromValue}
                onChange={onChangeFromWednesday}
                disabled={!wednesdayValue}
              />
            </div>
            <div>
              <Input
                label="To"
                name="toWednesday"
                type="string"
                value={wednesdayToValue}
                onChange={onChangeToWednesday}
                disabled={!wednesdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityThursday} className={styles.eachDay}>
              <Input label="Thursday" type="checkbox" value={true} name="thursday" />
            </div>
            <div>
              <Input
                label="From"
                name="fromThursday"
                type="string"
                value={thursdayFromValue}
                onChange={onChangeFromThursday}
                disabled={!thursdayValue}
              />
            </div>
            <div>
              <Input
                label="To"
                name="toThursday"
                type="string"
                value={thursdayToValue}
                onChange={onChangeToThursday}
                disabled={!thursdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityFriday} className={styles.eachDay}>
              <Input label="Friday" type="checkbox" value={true} name="thursday" />
            </div>
            <div>
              <Input
                label="From"
                name="fromFriday"
                type="string"
                value={fridayFromValue}
                onChange={onChangeFromFriday}
                disabled={!fridayValue}
              />
            </div>
            <div>
              <Input
                label="To"
                name="toFriday"
                type="string"
                value={fridayToValue}
                onChange={onChangeToFriday}
                disabled={!fridayValue}
              />
            </div>
          </div>
        </div>
        <Button type="Submit" disabled={canSave} />
      </form>
    </div>
  );
};

export default CouncelorsForm;
