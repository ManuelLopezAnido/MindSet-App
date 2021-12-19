import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import ErrorModal from 'Components/Shared/ErrorModal';
import Modal from 'Components/Shared/Modal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneClient, addClient, updateClient } from 'redux/clients/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/clients/actions';
import { useHistory } from 'react-router-dom';

const ClientsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [companyNameValue, setCompanyNameValue] = useState('');
  const [companyTypeValue, setCompanyTypeValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [openPositionsValue, setOpenPositionsValue] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory();

  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);
  const selected = useSelector((store) => store.clients.selected);

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  if (clientId) {
    useEffect(() => {
      dispatch(getOneClient(clientId));
    }, []);

    useEffect(() => {
      setCompanyNameValue(selected.companyName ?? '-');
      setCompanyTypeValue(selected.companyType ?? '-');
      setCityValue(selected.city ?? '-');
      setCountryValue(selected.country ?? '-');
      setEmailValue(selected.email ?? '-');
      setPhoneValue(selected.phone ?? '-');
      setOpenPositionsValue(selected.openPositions ?? '-');
    }, [selected]);
  }

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

  const submit = () => {
    if (clientId) {
      dispatch(
        updateClient(clientId, {
          companyName: companyNameValue,
          companyType: companyTypeValue,
          city: cityValue,
          country: countryValue,
          email: emailValue,
          phone: phoneValue,
          openPositions: openPositionsValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    } else {
      dispatch(
        addClient({
          companyName: companyNameValue,
          companyType: companyTypeValue,
          city: cityValue,
          country: countryValue,
          email: emailValue,
          phone: phoneValue,
          openPositions: openPositionsValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    }
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.form}>
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
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <Input
          label="Company Name"
          id="companyName"
          name="companyName"
          type="string"
          required
          value={companyNameValue}
          onChange={onChangeCompanyNameValue}
        />
        <Input
          label="Company Type"
          id="companyType"
          name="companyType"
          type="string"
          required
          value={companyTypeValue}
          onChange={onChangeCompanyType}
        />
        <Input
          label="City"
          id="city"
          name="companyType"
          type="string"
          required
          value={cityValue}
          onChange={onChangeCity}
        />
        <Input
          label="Country"
          id="country"
          name="country"
          type="string"
          required
          value={countryValue}
          onChange={onChangeCountry}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          value={emailValue}
          onChange={onChangeEmail}
          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
        />
        <Input
          label="Phone"
          id="phone"
          name="phone"
          type="number"
          required
          value={phoneValue}
          onChange={onChangePhone}
          pattern="^[0-9]*$"
        />
        <Input
          label="Open Positions"
          id="openPositions"
          name="openPositions"
          // required
          value={openPositionsValue}
          onChange={onChangeOpenPositions}
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ClientsForm;
