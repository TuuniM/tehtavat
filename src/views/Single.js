import {uploadsUrl} from '../utils/variables';
import {useParams} from 'react-router-dom';

const Single = () => {
  console.log('match', useParams());
  // eslint-disable-next-line no-unused-vars
  const {id} = useParams();
  const file = {}; // TODO: fetch single media based on id from path parameter

  return (
    <>
      <h1>{file.title}</h1>
      <img src={uploadsUrl + file.filename} alt={file.title}/>
    </>
  );
};

export default Single;
