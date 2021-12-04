import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import IsLoading from '../../Shared/IsLoading/IsLoading';

const FormPositions = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [closingDate, setClosingDate] = useState('');
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
  const PosId = params.get('id');

  useEffect(() => {
    if (PosId) {
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    }
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div>
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <input
          id="jobTitle"
          name="jobTitleName"
          required
          value={jobTitle}
          onChange={onChangeJobTitle}
          placeholder="Job"
        />
        <input
          id="clientId"
          name="clientIdName"
          required
          value={clientId ? clientId._id : 'not found'}
          onChange={onChangeClientId}
          placeholder="Company ID"
        />
        <input
          id="companyName"
          name="compantNameName"
          value={companyName}
          onChange={onChangeCompanyName}
          placeholder="Company Name"
        />
        <input
          id="jobDescription"
          name="jobDescriptionName"
          value={jobDescription}
          onChange={onChangeJobDescription}
          placeholder="Description"
        />
        <input id="city" name="cityName" value={city} onChange={onChangeCity} placeholder="City" />
        <input
          id="country"
          name="countryName"
          value={country}
          onChange={onChangeCountry}
          placeholder="Country"
        />
        <input
          id="datePosted"
          name="datePostedName"
          value={datePosted}
          onChange={onChangeDatePosted}
          placeholder="Date Posted"
        />
        <input
          id="closingDate"
          name="closingDateName"
          value={closingDate}
          onChange={onChangeClosingDate}
          placeholder="Closing Date"
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default FormPositions;
