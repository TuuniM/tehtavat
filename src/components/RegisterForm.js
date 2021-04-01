import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {useState} from 'react';

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    email: false,
    full_name: false,
  });

  const [helperTexts, setHelperTexts] = useState({
    username: '',
    password: 'salasana väärä muotoa',
    email: 'sähköposti väärää muotoa',
    full_name: 'vain kirjamia siis hei pliis jooko',
  });

  const doRegister = async () => {
    try {
      console.log('rekisteröinti lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log('availabale', available);
      if (available) {
        register(inputs);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleUserChange = async (event) => {
    handleInputChange(event);
    if (event.target.value.length > 2) {
      const available = await getUserAvailable(event.target.value);
      console.log('onk vapaana', available);
      setErrors((errors)=>{
        return {
          ...errors,
          username: !available,
        };
      });
      setHelperTexts((helperTexts)=>{
        return {
          ...helperTexts,
          username: available ? '' : 'tunnus on jo käytössä',
        };
      });
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  // console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleUserChange}
                value={inputs.username}
                error={errors.username}
                helperText={helperTexts.username}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
              />
            </Grid>

            <Grid container item>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
