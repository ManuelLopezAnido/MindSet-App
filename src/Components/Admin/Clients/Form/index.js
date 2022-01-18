import React, { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import styles from './form.module.css';
import Input from 'Components/Shared/FormInput';
import SaveButton from 'Components/Shared/SaveButton';
import ErrorModal from 'Components/Shared/ErrorModal';
import Modal from 'Components/Shared/Modal';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';
import locationIcon from 'assets/images/location.png';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import { getOneClient, addClient, updateClient } from 'redux/clients/thunks';
import { getPositions, deletePosition } from 'redux/positions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault, selectedToDefault } from 'redux/admins/actions';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePhone } from 'validations';

const ClientsForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const errorMessage = useSelector((store) => store.clients.errorMessage);
  const selectedClient = useSelector((store) => store.clients.selected);
  const positions = useSelector((store) => store.positions.list);

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('id');

  useEffect(() => {
    dispatch(getPositions());
    if (clientId) {
      dispatch(getOneClient(clientId));
    } else {
      dispatch(selectedToDefault());
    }
  }, []);

  let filtredPositions = positions.filter((position) => {
    return position.clientId?._id === clientId;
  });

  const submit = () => {
    if (clientId) {
      dispatch(updateClient(clientId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    } else {
      dispatch(addClient(formValues)).then((response) => {
        if (response) {
          history.push('/admin/clients');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    errors.phone = validatePhone(formValues.phone);
    return errors;
  };

  const onSubmit = (formValues) => {
    setFormValues(formValues);
    setShowModal(true);
  };

  if (isLoading) return <IsLoading />;

  const onDeletePosition = () => {
    console.log('delete', selectedId);
    dispatch(deletePosition(selectedId));
    setShowModalDelete(false);
  };

  const handleIdPosition = (event, selectedId) => {
    console.log('handle', selectedId);
    event.stopPropagation();
    setSelectedId(selectedId);
    setShowModalDelete(true);
  };

  return (
    <section className={listStyles.mainFormContainer}>
      <Modal
        showModal={showModalDelete}
        closeModal={() => setShowModalDelete(false)}
        actionEntity={onDeletePosition}
        selectedId={selectedId}
        titleText="Delete a Position"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this position?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
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
      <h2> {`${clientId == null ? 'Add a new Client' : 'Client Profile'}`} </h2>
      <div className={listStyles.containerForm}>
        <div className={listStyles.headerForm}>
          <div className={listStyles.imageEntity}>
            <img
              className={listStyles.logoEntity}
              src={
                clientId
                  ? 'http://3.bp.blogspot.com/_nKcd5vPHWY4/TJN_ySnkWCI/AAAAAAAAYvs/7h2_Z78Poj4/w1200-h630-p-k-no-nu/timthumb.jpg'
                  : ''
              }
            />
          </div>
          <div className={listStyles.entityName}>
            {clientId == null ? '' : `${selectedClient.clientName}`}
          </div>
        </div>
        <div className={listStyles.form}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={selectedClient}
            render={(formProps) => (
              <form className={listStyles.inputs} onSubmit={formProps.handleSubmit}>
                <div className={listStyles.fields}>
                  <Field
                    label="Client Name"
                    id="clientName"
                    name="clientName"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter the client name')}
                  />
                  <Field
                    label="Client Type"
                    id="clientType"
                    name="clientType"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter the client type')}
                  />
                  <Field
                    label="City"
                    id="city"
                    name="city"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter a city')}
                  />
                  <Field
                    label="Country"
                    id="country"
                    name="country"
                    type="string"
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter a country')}
                  />
                  <Field
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter an email')}
                  />
                  <Field
                    label="Phone"
                    id="phone"
                    name="phone"
                    type="number"
                    required
                    component={Input}
                    disabled={formProps.submitting}
                    validate={(value) => (value ? undefined : 'please enter a number phone')}
                  />
                </div>
                <SaveButton type="submit" disabled={formProps.submitting || formProps.pristine} />
              </form>
            )}
          />
        </div>
        <div className={styles.positionMainContainer}>
          <div className={styles.headerPosition}>
            <h3>Company open positions</h3>
            <button
              className={styles.buttonAdd}
              onClick={() => history.push(`/admin/positions/form?client=${clientId}`)}
            >
              +
            </button>
          </div>
          <div className={styles.positionList}>
            {filtredPositions.map((position) => (
              <div className={listStyles.container} key={position._id}>
                <div className={listStyles.title}>
                  <p>{position.jobTitle}</p>
                  <DeleteButton onClick={(event) => handleIdPosition(event, position._id)} />
                </div>
                <p className={styles.positionDescription}>{position.jobDescription}</p>
                <div className={listStyles.footerContainer}>
                  <div className={listStyles.location}>
                    <img src={locationIcon} />
                    <p>
                      {position.city}, {position.country}
                    </p>
                  </div>
                  <button
                    onClick={() => (window.location.href = `../positions/form?id=${position._id}`)}
                    className={listStyles.buttonPlus}
                    type="submit"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsForm;
