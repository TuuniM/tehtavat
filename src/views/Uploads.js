import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {CircularProgress} from '@material-ui/core';
import PropTypes from 'prop-types';

const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();

  const doUpload = async () => {
    const fd = new FormData();
    fd.append('title', inputs.title);
    fd.append('description', inputs.description);
    fd.append('file', inputs.file);
    const result = await postMedia(fd, localStorage.getItem('token'));
    console.log('doUpload', result);
    history.push('/home');
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange} =
    useUploadForm(doUpload, {
      title: '',
      description: '',
      file: null,
    });

  return (
    <div>
      {!loading ?
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="file"
            name="file"
            accept="image/*, audio/*, video/*"
            onChange={handleFileChange}
          />
          <button type="submit">Lähetä</button>
        </form> :
        <CircularProgress/>
      }
    </div>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};


export default Upload;
