import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false); 
  const [passError, setPassError] = useState(false);
  const [errorMessagePass, setErrorMessagePass] = useState('');
  const [errorMessageMail, setErrorMessageMail] = useState('');

  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const validator = require('email-validator');
    const validEmail = validator.validate(email); //returns true if email is valid

    if (!validEmail){
      setErrorMessageMail("Enter a valid Email Address")
      setEmailError(true)
    }

    const uppercase   = /(?=.*?[A-Z])/.test(password);
    const lowercase   = /(?=.*?[a-z])/.test(password);
    const digits      = /(?=.*?[0-9])/.test(password);
    const specialChar = /(?=.*?[#?!@$%^&*-])/.test(password);
    const minLength   = /.{8}/.test(password);


    if(password === ""){
      setPassError(true)
      setErrorMessagePass("Password contain a minimum of 8 characters, 1 lowercase letter, 1 uppercase letter, 1 digit & 1 special Character")
    }else if (!uppercase){
      setPassError(true)
      setErrorMessagePass("Password should contain at least 1 uppercase letter")
    }else if(!lowercase){
      setPassError(true)
      setErrorMessagePass("Password should contain at least 1 uppercase letter")
    }else if(!digits){
      setPassError(true)
      setErrorMessagePass("Password should contain at least 1 digit")
    }else if(!specialChar){
      setPassError(true)
      setErrorMessagePass("Password should contain at least 1 Special Character")
    }else if(!minLength){
      setPassError(true)
      setErrorMessagePass("Password must be a minimum of 8 characters")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    // The next few lines resets all the state values from the previous submission
    setEmailError(false)
    setPassError(false)
    setErrorMessagePass('')
    setErrorMessageMail('')

    // calls the validation logic to validate email & password input
    validateForm(event);

    if (email !=="" && password !=="" && emailError === false && passError === false ){
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={errorMessageMail}
              data-testid="emailfield"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passError}
              helperText={errorMessagePass}
              data-testid="passfield"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              data-testid='button'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
