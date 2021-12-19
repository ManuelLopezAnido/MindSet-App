import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import IsLoading from '../Shared/IsLoading/IsLoading';
import Button from '../Shared/Button/Button';
import DeleteButton from '../Shared/DeleteButton/DeleteButton';
import NoData from '../Shared/NoData/NoData';
import { getPositions, deletePosition } from '../../redux/positions/thunks';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from '../../redux/positions/actions';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const listPositions = useSelector((store) => store.positions.list);
  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    if (!listPositions.length) {
      dispatch(getPositions());
    }
  }, [listPositions]);

  const addPositions = () => {
    history.push('/positions/form');
  };

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
    <section className={styles.container}>
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
      <div className={styles.titleAndButton}>
        <h3>Positions</h3>
        <Button onClick={addPositions} value="Positions" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Job</th>
            <th>Company </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {listPositions.map((a) => (
            <tr
              className={styles.positionRow}
              key={a._id}
              onClick={() => (window.location.href = `positions/form?id=${a._id}`)}
            >
              <td>{a.jobTitle}</td>
              <td>{a.companyName}</td>
              <td>{a.jobDescription}</td>
              <td className={styles.deleteButtonTD}>
                <DeleteButton onClick={(e) => handleIdPosition(e, a._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NoData data={listPositions.length} />
    </section>
  );
}

export default Positions;
