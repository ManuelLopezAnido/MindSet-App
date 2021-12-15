import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addPosition, getOnePosition, updatePosition } from '../../../redux/positions/thunks';
import { errorToDefault } from '../../../redux/positions/actions';

const PositionsForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [closingDate, setClosingDate] = useState('');

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);
  const selectedPosition = useSelector((store) => store.positions.selected);

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

  if (posId) {
    useEffect(() => {
      dispatch(getOnePosition(posId));
    }, []);
  }

  useEffect(() => {
    setJobTitle(selectedPosition.jobTitle ?? '');
    setClientId(selectedPosition.clientId ?? '');
    setCompanyName(selectedPosition.companyName ?? '');
    setjobDescription(selectedPosition.companyName ?? '');
    setCity(selectedPosition.city ?? '');
    setCountry(selectedPosition.country ?? '');
    setDatePosted(selectedPosition.datePosted ?? '');
    setClosingDate(selectedPosition.closingDate ?? '');
  }, [selectedPosition]);

  const submit = () => {
    if (posId) {
      dispatch(
        updatePosition(posId, {
          jobTitle: jobTitle,
          clientId: clientId,
          companyName: companyName,
          city: city,
          country: country,
          datePosted: datePosted,
          closingDate: closingDate
        })
      ).then((response) => {
        if (response) {
          history.push('/positions');
        }
      });
    } else {
      dispatch(
        addPosition({
          jobTitle: jobTitle,
          clientId: clientId,
          companyName: companyName,
          city: city,
          country: country,
          datePosted: datePosted,
          closingDate: closingDate
        })
      ).then((response) => {
        if (response) {
          history.push('/positions');
        }
      });
    }
  };

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
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
        showModal={error}
        closeModal={closeErrorMessage}
        titleText="Error"
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
