import {uploadsUrl} from '../utils/variables';
import {useParams} from 'react-router-dom';
import {useSingleMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const Single = ({location}) => {
  console.log('match', location);
  const {id} = useParams();
  // const file = props.location.state;
  const file = useSingleMedia(id);

  return (
    <>
      <h1>{file.title}</h1>
      <img src={uploadsUrl + file.filename} alt={file.title}/>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
