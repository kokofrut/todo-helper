import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function AvailabilityMessage(props) {
  const { isAvailable } = props;
  if (isAvailable === true) {
    return <p style={{ color: "#c4f2c8" }}>Available</p>;
  } else if (isAvailable === false) {
    return <p style={{ color: "#edafc0" }}>Already Taken</p>;
  } else {
    return null;
  }
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Todo Task
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp({ onSignUp, checkForTaken }) {
  const [isAvailable, setIsAvailable] = React.useState(false)
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    onSignUp(username, password);
  };

  function checkUsername(event) {
    let check = checkForTaken(event.target.value);
    setIsAvailable(check)
    check == true ? console.log('available') : console.log('already taken')
  }

  function handleChange(event) {
    window.location.hash = '#sign-in'
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="UserName"
                autoFocus
                onChange={(e) => checkUsername(e)}
              />
              <AvailabilityMessage isAvailable={isAvailable} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#sign-in" variant="body2" onClick={(e) => handleChange(e)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}