import { useEffect, useState } from 'react';
import listStyles from 'lists.module.css';
import NoData from 'Components/Shared/NoData';
import { getPositions, deletePosition } from 'redux/positions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { errorToDefault } from 'redux/positions/actions';
import Modal from 'Components/Shared/Modal';
import ErrorModal from 'Components/Shared/ErrorModal';
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
    <section className={listStyles.maincontainer}>
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
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => setInputSearchBar(event.target.value)}
      ></input>
      <table className={listStyles.list}>
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
                position.jobTitle.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
                position.clientName.toLowerCase().includes(inputSearchBar.toLowerCase())
              ) {
                return position;
              }
            })
            .map((a) => (
              <tr
                key={a._id}
                onClick={() => (window.location.href = `/admin/positions/form?id=${a._id}`)}
              >
                <td>{a.jobTitle}</td>
                <td>{a.clientName}</td>
                <td className={listStyles.button}>
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
