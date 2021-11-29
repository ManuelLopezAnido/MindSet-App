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
        phone: phoneValue
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
          className={styles.input}
          value={countryValue}
          onChange={onChangeCountryInput}
        />
        <Input
          name="phone"
          type="number"
          placeholder="Phone"
          required
          className={styles.input}
          value={phoneValue}
          onChange={onChangePhoneInput}
          onBlur={validateSave}
          onFocus={hidePhone}
        />
        <Error showError={phoneError} text={'Telephones with # () and blanks are not valid'} />
        <Button type="Submit" disabled={save} />
      </form>
    </div>
  );
}

export default Form;
