import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();
  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: false,
    email: false,
    full_name: false,
  };

  const errorMessages = {
    username: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'tunnus ei oo vapaa'],
    password: 'salasana väärä muotoa',
    email: 'sähköposti väärää muotoa',
    full_name: 'vain kirjamia siis hei pliis jooko',
  };

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

  useEffect(()=>{
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await getUserAvailable(value);
          console.log('onk vapaana', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });
  }, []);

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
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={validators.username}
                errorMessages={errorMessages.username}
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
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
