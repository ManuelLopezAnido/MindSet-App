import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import NoData from 'Components/Shared/NoData/NoData';
import { getPositions, deletePosition } from 'redux/positions/thunks';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/positions/actions';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Button from 'Components/Shared/Button/Button';
import DeleteButton from 'Components/Shared/DeleteButton/DeleteButton';

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
    history.push('/admin/positions/form');
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

  if (isLoading) return <IsLoading />;

  return (
    <section className={listStyles.container}>
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
      <Modal
        showModal={!!error}
        closeModal={() => dispatch(errorToDefault())}
        titleText="Error"
        spanObjectArray={[
          {
            span: error
          }
        ]}
        leftButtonText=""
        rightButtonText="OK"
      />
      <div className={listStyles.titleAndButton}>
        <h3>Positions</h3>
        <Button onClick={addPositions} value="Positions" />
      </div>
      <table className={listStyles.list}>
        <thead>
          <tr>
            <th>Job</th>
            <th>Client</th>
            <th>Cancel postulation</th>
          </tr>
        </thead>
        <tbody>
          {listPositions.map((a) => (
            <tr
              key={a._id}
              onClick={() => (window.location.href = `/admin/positions/form?id=${a._id}`)}
            >
              <td>{a.jobTitle}</td>
              <td>{a.clientName}</td>
              <td>
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
