import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea, CardContent, CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '50vh',
  },
});

const Single = ({location}) => {
  const [owner, setOwner] = useState(null);
  const classes = useStyles();
  const {getUserById} = useUsers();

  const file = location.state;
  const desc = JSON.parse(file.description);
  console.log(desc);

  useEffect(()=>{
    (async () => {
      setOwner(await getUserById(localStorage.getItem('token'), file.user_id));
    })();
  }, []);


  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom
      >
        {file.title}
      </Typography>
      <Paper elevation="3">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={uploadsUrl + file.filename}
              title={file.title}
              style={{
                filter: `
                      brightness(${desc.filters.brightness}%)
                      contrast(${desc.filters.contrast}%)
                      saturate(${desc.filters.saturate}%)
                      sepia(${desc.filters.sepia}%)
                      `,
              }}
            />
            <CardContent>
              <Typography gutterBottom>{desc.description}</Typography>
              <Typography variant="subtitle2">{owner?.username}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
