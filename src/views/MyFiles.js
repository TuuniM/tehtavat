import MediaTable from '../components/MediaTable';
import {Typography} from '@material-ui/core';

const MyFiles = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My files</Typography>
      <MediaTable ownFiles={true}/>
    </>
  );
};

export default MyFiles;
