import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const PositionsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeJobTitle = (event) => {
    setJobTitle(event.target.value);
  };
  const onChangeClientId = (event) => {
    setClientId(event.target.value);
  };
  const onChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };
  const onChangeJobDescription = (event) => {
    setjobDescription(event.target.value);
  };
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const onChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const onChangeDatePosted = (event) => {
    setDatePosted(event.target.value);
  };
  const onChangeClosingDate = (event) => {
    setClosingDate(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const posId = params.get('id');

  useEffect(() => {
    if (posId) {
      fetch(`${process.env.REACT_APP_API}/positions/id/${posId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then((response) => {
          setJobTitle(response.jobTitle);
          setClientId(response.clientId);
          setCompanyName(response.companyName);
          setjobDescription(response.jobDescription);
          setCity(response.city);
          setCountry(response.country);
          setDatePosted(response.datePosted);
          setClosingDate(response.closingDate);
        })
        .catch((error) => {
          setShowErrorModal(true);
          setShowErrorModalMessage(JSON.stringify(error.message));
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const submit = () => {
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobTitle: jobTitle,
        clientId: clientId,
        companyName: companyName,
        jobDescription: jobDescription,
        city: city,
        country: country,
        datePosted: datePosted,
        closingDate: closingDate
      })
    };

    if (posId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/positions/create`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/positions/update/${posId}`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
      })
      .then(() => {
        window.location.href = `/positions`;
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

  const closeErrorMessage = () => {
    setShowErrorModal(false);
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
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
        <Input
          label="Job"
          id="jobTitle"
          name="jobTitleName"
          type="string"
          required
          value={jobTitle}
          onChange={onChangeJobTitle}
        />
        <Input
          label="Company ID"
          id="clientId"
          name="clientIdName"
          type="string"
          required
          value={clientId}
          onChange={onChangeClientId}
        />
        <Input
          label="Company Name"
          id="companyName"
          name="compantNameName"
          type="string"
          required
          value={companyName}
          onChange={onChangeCompanyName}
        />
        <Input
          label="Job Description"
          id="jobDescription"
          name="jobDescriptionName"
          type="string"
          required
          value={jobDescription}
          onChange={onChangeJobDescription}
        />
        <Input
          label="City"
          id="city"
          name="cityName"
          type="string"
          required
          value={city}
          onChange={onChangeCity}
        />
        <Input
          label="Country"
          id="country"
          name="countryName"
          type="string"
          required
          value={country}
          onChange={onChangeCountry}
        />
        <Input
          label="Date Posted"
          id="datePosted"
          name="datePostedName"
          type="date"
          required
          value={datePosted}
          onChange={onChangeDatePosted}
        />
        <Input
          label="Closing Date"
          id="closingDate"
          name="closingDateName"
          type="date"
          required
          value={closingDate}
          onChange={onChangeClosingDate}
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default PositionsForm;
