import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';

const FormPositions = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [closingDate, setClosingDate] = useState('');

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
  const PosId = params.get('id');

  useEffect(() => {
    if (PosId) {
      fetch(`${process.env.REACT_APP_API}/positions/id/${PosId}`)
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
        });
    }
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
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

    if (PosId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/positions/create`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/positions/update/${PosId}`;
    }
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ ErrMessage }) => {
            throw new Error(ErrMessage);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `/positions`;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div>
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

export default FormPositions;
