import PropTypes from 'prop-types';

const Logout = ({history}) => {
  localStorage.clear();
  history.push('/');
  return (
    <>
      <h1>Logout</h1>
    </>
  );
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
