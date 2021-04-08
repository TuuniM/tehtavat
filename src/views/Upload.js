import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Slider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description);
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      const tagResult = await postTag(
        localStorage.getItem('token'),
        result.file_id,
      );
      console.log('doUpload', result, tagResult);
      history.push('/');
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
    useUploadForm(doUpload, {
      title: '',
      description: '',
      file: null,
      dataUrl: '',
    });

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs]);

  console.log(inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
        >
          Upload
        </Typography>
      </Grid>
      <Grid item>
        {!loading ?
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item>
                <TextValidator
                  fullWidth
                  name="title"
                  label="Title"
                  value={inputs.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
                  name="description"
                  label="Description"
                  value={inputs.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
                  type="file"
                  name="file"
                  accept="image/*, audio/*, video/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Lähetä
                </Button>
              </Grid>
              {inputs.dataUrl.length > 0 &&
              <>
                <Grid item xs={12}>
                  <img
                    src={inputs.dataUrl}
                    style={{
                      filter: `
                      brightness(100%)
                      contrast(100%)
                      saturate(100%)
                      sepia(100%)
                      `,
                    }}
                  />
                </Grid>
                <Grid container>
                  <Grid item>
                    <Typography>Brightness</Typography>
                    <Slider />
                  </Grid>
                  <Grid item>
                    <Typography>Contrast</Typography>
                    <Slider />
                  </Grid>
                  <Grid item>
                    <Typography>Saturation</Typography>
                    <Slider />
                  </Grid>
                  <Grid item>
                    <Typography>Sepia</Typography>
                    <Slider />
                  </Grid>
                </Grid>
              </>
              }
            </Grid>
          </ValidatorForm> :
          <CircularProgress/>
        }
      </Grid>
    </Grid>
  );
};

Upload.propTypes =
  {
    history: PropTypes.object,
  };


export default Upload;
