import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import ErrorModal from '../../Shared/ErrorModal';
import Modal from '../../Shared/Modal';
import IsLoading from '../../Shared/IsLoading/IsLoading';

const ClientsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [companyNameValue, setCompanyNameValue] = useState('');
  const [companyTypeValue, setCompanyTypeValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [openPositionsValue, setOpenPositionsValue] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCompanyNameValue = (event) => {
    setCompanyNameValue(event.target.value);
  };
  const onChangeCompanyType = (event) => {
    setCompanyTypeValue(event.target.value);
  };
  const onChangeCity = (event) => {
    setCityValue(event.target.value);
  };
  const onChangeCountry = (event) => {
    setCountryValue(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhoneValue(event.target.value);
  };
  const onChangeOpenPositions = (event) => {
    setOpenPositionsValue(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  useEffect(() => {
    if (clientId) {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_API}/clients/id/${clientId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setCompanyNameValue(response.companyName);
          setCompanyTypeValue(response.companyType);
          setCityValue(response.city);
          setCountryValue(response.country);
          setEmailValue(response.email);
          setPhoneValue(response.phone);
          setOpenPositionsValue(response.openPositions);
        })
        .catch((error) => {
          setShowErrorModal(true);
          setShowErrorModalMessage(JSON.stringify(error.message));
        })
        .finally(() => {
          setIsLoading(false);
          setShowModal(false);
        });
    }
  }, []);

  const submit = () => {
    setIsLoading(true);
    let url;

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companyName: companyNameValue,
        companyType: companyTypeValue,
        city: cityValue,
        country: countryValue,
        email: emailValue,
        phone: phoneValue,
        openPositions: openPositionsValue
      })
    };

    if (clientId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/clients/add`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/clients/update/${clientId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return (window.location.href = `/clients`);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setShowErrorModalMessage(JSON.stringify(error.message));
      })
      .finally(() => {
        setShowModal(false);
        setIsLoading(false);
      });
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div>
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
        showModal={showErrorModal}
        closeModal={closeErrorMessage}
        titleText="Error"
        middleText={showErrorModalMessage}
        buttonText="ok"
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input
          id="companyName"
          name="companyName"
          required
          value={companyNameValue}
          onChange={onChangeCompanyNameValue}
          placeholder="Company Name"
        />
        <input
          id="companyType"
          name="companyType"
          required
          value={companyTypeValue}
          onChange={onChangeCompanyType}
          placeholder="Company Type"
        />
        <input id="city" name="city" value={cityValue} onChange={onChangeCity} placeholder="City" />
        <input
          id="country"
          name="country"
          value={countryValue}
          onChange={onChangeCountry}
          placeholder="Country"
        />
        <input
          id="email"
          name="email"
          type="email"
          required
          value={emailValue}
          onChange={onChangeEmail}
          placeholder="Email"
          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
          title="Type a correct email"
        />
        <input
          id="phone"
          name="phone"
          type="number"
          required
          value={phoneValue}
          onChange={onChangePhone}
          placeholder="Phone"
          pattern="^[0-9]*$"
          title="Type a correct phone number"
        />
        <input
          id="openPositions"
          name="openPositions"
          value={openPositionsValue}
          onChange={onChangeOpenPositions}
          placeholder="Open Positions"
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ClientsForm;
