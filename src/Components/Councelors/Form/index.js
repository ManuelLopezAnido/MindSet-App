import { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';
import Error from '../Error';
import Button from '../Button';

function Form() {
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
  const [save, setSave] = useState(true);

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
    setMondayValue(event.target.value);
    console.log(mondayValue);
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

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const councelorId = params.get('id');
    let url;

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        gender: genderValue,
        adress: adressValue,
        birthday: birthdayValue,
        city: cityValue,
        country: countryValue,
        phone: phoneValue,
        availability: {
          monday: {
            availability: mondayValue,
            from: mondayFromValue,
            to: mondayToValue
          },
          tuesday: {
            availability: tuesdayValue,
            from: tuesdayFromValue,
            to: tuesdayToValue
          },
          wednesday: {
            availability: wednesdayValue,
            from: wednesdayFromValue,
            to: wednesdayToValue
          },
          thursday: {
            availability: thursdayValue,
            from: thursdayFromValue,
            to: thursdayToValue
          },
          friday: {
            availability: fridayValue,
            from: fridayFromValue,
            to: fridayToValue
          }
        }
      })
    };

    if (councelorId !== null) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/api/counselors/update/${councelorId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/api/counselors/add`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
      })
      .then(() => {
        window.location.replace(`http://localhost:3000/councelors`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const hideEmail = () => {
    setEmailError(false);
    if (!emailValue.includes('@')) {
      setSave(true);
    }
  };

  const hideBirthday = () => {
    setBirthdayError(false);
    const exp =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    if (!exp.test(birthdayValue)) {
      setSave(true);
    }
  };

  const hidePhone = () => {
    setPhoneError(false);
    if (
      phoneValue.length < 8 ||
      phoneValue.includes('(') ||
      phoneValue.includes(')') ||
      phoneValue.includes('#')
    ) {
      setSave(true);
    }
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setEmailError(true);
      setSave(true);
    }
  };

  const validateBirthday = (birthday) => {
    const exp =
      /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    if (!exp.test(birthday)) {
      setBirthdayError(true);
      setSave(true);
    }
  };

  const validatePhone = (phone) => {
    if (phone.length < 8 || phone.includes('(') || phone.includes(')') || phone.includes('#')) {
      setPhoneError(true);
      setSave(true);
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
      console.log('entro');
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
        setSave(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          name="firstName"
          type="string"
          placeholder="First Name"
          required
          className={styles.input}
          value={firstNameValue}
          onChange={onChangeFirstNameInput}
        />
        <Input
          name="lastName"
          type="string"
          placeholder="Last Name"
          required
          className={styles.input}
          value={lastNameValue}
          onChange={onChangeLastNameInput}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          className={styles.input}
          value={emailValue}
          onChange={onChangeEmailInput}
          onBlur={validateSave}
          onFocus={hideEmail}
        />
        <Error showError={emailError} text={'Please enter a valid email'} />
        <Input
          name="gender"
          type="string"
          placeholder="Gender"
          required
          className={styles.input}
          value={genderValue}
          onChange={onChangeGenderInput}
        />
        <Input
          name="adress"
          type="string"
          placeholder="Adress"
          required
          className={styles.input}
          value={adressValue}
          onChange={onChangeAdressInput}
        />
        <Input
          name="birthday"
          type="string"
          placeholder="Birthday"
          required
          className={styles.input}
          value={birthdayValue}
          onChange={onChangeBirthdayInput}
          onBlur={validateSave}
          onFocus={hideBirthday}
        />
        <Error showError={birthdayError} text={'Please enter a valid date (dd/mm/yyyy)'} />
        <Input
          name="city"
          type="string"
          placeholder="City"
          required
          className={styles.input}
          value={cityValue}
          onChange={onChangeCityInput}
        />
        <Input
          name="country"
          type="string"
          placeholder="Country"
          required
          value={countryValue}
          onChange={onChangeCountryInput}
        />
        <Input
          name="phone"
          type="number"
          placeholder="Phone"
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
              <p>Monday</p>
              <label>Yes</label>
              <Input type="radio" value={true} name="monday" tittle="Yes" />
              <label>No</label>
              <Input type="radio" value={false} name="monday" />
            </div>
            <div className={styles.fromTo}>
              <label>From</label>
              <Input
                name="fromMonday"
                type="string"
                placeholder="00:00"
                value={mondayFromValue}
                onChange={onChangeFromMonday}
                disabled={!mondayValue}
              />
            </div>
            <div className={styles.fromTo}>
              <label>To</label>
              <Input
                name="toMonday"
                type="string"
                placeholder="00:00"
                value={mondayToValue}
                onChange={onChangeToMonday}
                disabled={!mondayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityTuesday} className={styles.eachDay}>
              <p>Tuesday</p>
              <label>Yes</label>
              <Input type="radio" value={true} name="tuesday" />
              <label>No</label>
              <Input type="radio" value={false} name="tuesday" />
            </div>
            <div className={styles.fromTo}>
              <label>From</label>
              <Input
                name="fromTuesday"
                type="string"
                placeholder="00:00"
                value={tuesdayFromValue}
                onChange={onChangeFromTuesday}
                disabled={!tuesdayValue}
              />
            </div>
            <div className={styles.fromTo}>
              <label>To</label>
              <Input
                name="toTuesday"
                type="string"
                placeholder="00:00"
                value={tuesdayToValue}
                onChange={onChangeToTuesday}
                disabled={!tuesdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityWednesday} className={styles.eachDay}>
              <p>Wednesday</p>
              <label>Yes</label>
              <Input type="radio" value={true} name="wednesday" />
              <label>No</label>
              <Input type="radio" value={false} name="wednesday" />
            </div>
            <div className={styles.fromTo}>
              <label>From</label>
              <Input
                name="fromWednesday"
                type="string"
                placeholder="00:00"
                value={wednesdayFromValue}
                onChange={onChangeFromWednesday}
                disabled={!wednesdayValue}
              />
            </div>
            <div className={styles.fromTo}>
              <label>To</label>
              <Input
                name="toWednesday"
                type="string"
                placeholder="00:00"
                value={wednesdayToValue}
                onChange={onChangeToWednesday}
                disabled={!wednesdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityThursday} className={styles.eachDay}>
              <p>Thursday</p>
              <label>Yes</label>
              <Input type="radio" value={true} name="thursday" />
              <label>No</label>
              <Input type="radio" value={false} name="thursday" />
            </div>
            <div className={styles.fromTo}>
              <label>From</label>
              <Input
                name="fromThursday"
                type="string"
                placeholder="00:00"
                value={thursdayFromValue}
                onChange={onChangeFromThursday}
                disabled={!thursdayValue}
              />
            </div>
            <div className={styles.fromTo}>
              <label>To</label>
              <Input
                name="toThursday"
                type="string"
                placeholder="00:00"
                value={thursdayToValue}
                onChange={onChangeToThursday}
                disabled={!thursdayValue}
              />
            </div>
          </div>
          <div className={styles.day}>
            <div onChange={onChangeAvailabilityFriday} className={styles.eachDay}>
              <p>Friday</p>
              <label>Yes</label>
              <Input type="radio" value={true} name="friday" />
              <label>No</label>
              <Input type="radio" value={false} name="friday" />
            </div>
            <div className={styles.fromTo}>
              <label>From</label>
              <Input
                name="fromFriday"
                type="string"
                placeholder="00:00"
                value={fridayFromValue}
                onChange={onChangeFromFriday}
                disabled={!fridayValue}
              />
            </div>
            <div className={styles.fromTo}>
              <label>To</label>
              <Input
                name="toFriday"
                type="string"
                placeholder="00:00"
                value={fridayToValue}
                onChange={onChangeToFriday}
                disabled={!fridayValue}
              />
            </div>
          </div>
        </div>
        <Button type="Submit" disabled={save} />
      </form>
    </div>
  );
}

export default Form;
