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
import useSlider from '../hooks/SliderHooks';

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

  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
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
  }, [inputs.file]);

  console.log(inputs, sliderInputs);

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
              <Grid item xs={12}>
                <TextValidator
                  fullWidth
                  name="title"
                  label="Title"
                  value={inputs.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  fullWidth
                  name="description"
                  label="Description"
                  value={inputs.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  fullWidth
                  type="file"
                  name="file"
                  accept="image/*, audio/*, video/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Lähetä
                </Button>
              </Grid>
            </Grid>
            {inputs.dataUrl.length > 0 &&
            <Grid container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={6}>
                <img
                  src={inputs.dataUrl}
                  style={{
                    filter: `
                      brightness(${sliderInputs.brightness}%)
                      contrast(${sliderInputs.contrast}%)
                      saturate(${sliderInputs.saturate}%)
                      sepia(${sliderInputs.sepia}%)
                      `,
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>Brightness</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name="brightness"
                    value={sliderInputs?.brightness}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => value + '%'}
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Contrast</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name="contrast"
                    value={sliderInputs?.contrast}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => value + '%'}
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Saturation</Typography>
                  <Slider
                    min={0}
                    max={200}
                    step={1}
                    name="saturate"
                    value={sliderInputs?.saturate}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => value + '%'}
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Sepia</Typography>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    name="sepia"
                    value={sliderInputs?.sepia}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => value + '%'}
                    onChange={handleSliderChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            }
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
