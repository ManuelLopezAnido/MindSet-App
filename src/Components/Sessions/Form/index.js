import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import ErrorModal from '../../Shared/ErrorModal';
import IsLoading from '../../Shared/IsLoading/IsLoading';
import { getOneSession, addSession, updateSession } from '../../../redux/sessions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from '../../../redux/sessions/actions';
import { useHistory } from 'react-router-dom';

const SessionsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [counselorIdValue, setCounselorIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [accomplishedValue, setAccomplishedValue] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);
  const errorMessage = useSelector((store) => store.sessions.errorMessage);
  const selectedSession = useSelector((store) => store.sessions.selected);

  const onChangePostulantIdValue = (event) => {
    setPostulantIdValue(event.target.value);
  };

  const onChangeCounselorIdValue = (event) => {
    setCounselorIdValue(event.target.value);
  };

  const onChangeDateValue = (event) => {
    setDateValue(event.target.value);
  };

  const onChangeTimeValue = (event) => {
    setTimeValue(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');

  if (sessionId) {
    useEffect(() => {
      dispatch(getOneSession(sessionId));
    }, []);

    useEffect(() => {
      setPostulantIdValue(selectedSession.postulantId ?? '');
      setCounselorIdValue(selectedSession.counselorId ?? '');
      setDateValue(selectedSession.date ?? '');
      setTimeValue(selectedSession.time ?? '');
      setAccomplishedValue(selectedSession.accomplished ?? '');
    }, [selectedSession]);
  }

  const submit = () => {
    if (sessionId) {
      dispatch(
        updateSession(sessionId, {
          postulantId: postulantIdValue,
          counselorId: counselorIdValue,
          date: dateValue,
          time: timeValue,
          accomplished: accomplishedValue
        })
      ).then((response) => {
        if (response) {
          history.push('/sessions');
        }
      });
    } else {
      dispatch(
        addSession({
          postulantId: postulantIdValue,
          counselorId: counselorIdValue,
          date: dateValue,
          time: timeValue,
          accomplished: accomplishedValue
        })
      ).then((response) => {
        if (response) {
          history.push('/sessions');
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
        closeModal={() => errorToDefault()}
        titleText="Error"
        middleText={errorMessage}
        buttonText="ok"
      />
      <h1>Form</h1>
      <form className={styles.container} onSubmit={onSubmit}>
        <Input
          label="Postulant Id"
          id="postulantId"
          name="postulantId"
          type="string"
          required
          value={postulantIdValue}
          onChange={onChangePostulantIdValue}
        />
        <Input
          label="Counselor Id"
          id="counselorId"
          name="counselorId"
          type="string"
          required
          value={counselorIdValue}
          onChange={onChangeCounselorIdValue}
        />
        <Input
          label="Date"
          id="date"
          name="date"
          required
          value={dateValue}
          onChange={onChangeDateValue}
        />
        <Input
          label="Time"
          id="time"
          name="time"
          required
          value={timeValue}
          onChange={onChangeTimeValue}
        />
        <label>Accomplished</label>
        <Input
          type="checkbox"
          name="accomplished"
          onChange={(event) => setAccomplishedValue(event.target.checked)}
          checked={accomplishedValue}
        />
        <button className={styles.sendFormButton} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default SessionsForm;
