import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import listStyles from 'lists.module.css';
import { getPositions, deletePosition } from 'redux/positions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/positions/actions';
import Modal from 'Components/Shared/Modal';
import EditButton from 'Components/Shared/EditButton';
import ErrorModal from 'Components/Shared/ErrorModal';
import InputSearch from 'Components/Shared/InputSearch';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');

  const dispatch = useDispatch();

  const listPositions = useSelector((store) => store.positions.list);
  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    if (!listPositions.length) {
      dispatch(getPositions());
    }
  }, [listPositions]);

  const OnClickDeletePosition = () => {
    setShowModal(false);
    dispatch(deletePosition(selectedId));
  };

  const handleIdPosition = (event, id) => {
    event.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorMessage = () => {
    dispatch(errorToDefault());
  };
  if (isLoading) return <IsLoading />;

  return (
    <section className={listStyles.mainContainer}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        actionEntity={OnClickDeletePosition}
        selectedId={selectedId}
        titleText="Delete a position"
        spanObjectArray={[
          {
            span: 'Are you sure you want to delete this position?'
          }
        ]}
        leftButtonText="delete"
        rightButtonText="cancel"
      />
      <ErrorModal
        showModal={error}
        closeModal={closeErrorMessage}
        titleText="Error"
        buttonText="ok"
      />
      <div className={styles.inputSearch}>
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={listStyles.list}>
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Client</th>
              <th>Cancel postulation</th>
            </tr>
          </thead>
          <tbody>
            {listPositions
              .filter((position) => {
                if (
                  position.jobTitle?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                  position.clientName?.toLowerCase().includes(inputSearchBar.toLowerCase())
                ) {
                  return position;
                }
              })
              .map((position) => (
                <tr key={position._id}>
                  <td>{position.jobTitle}</td>
                  <td>{position.clientName}</td>
                  <td>
                    <EditButton
                      onClick={() =>
                        (window.location.href = `/admin/positions/form?id=${position._id}`)
                      }
                    />
                    <DeleteButton onClick={(event) => handleIdPosition(event, position._id)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Positions;
