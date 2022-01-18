import { useHistory } from 'react-router-dom';

const Rejected = () => {
  const history = useHistory();

  return (
    <div>
      <div>Access denied</div>
      <button onClick={history.push('/')}> Back to home page </button>
    </div>
  );
};

export default Rejected;
