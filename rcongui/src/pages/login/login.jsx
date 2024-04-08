import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themes from '../../themes';
import Footer from '../../components/Footer';
import { Stack } from '@mui/material';
import { Form } from 'react-router-dom';

export default function Login() {
  return (
    <ThemeProvider theme={themes.Light}>
        <Stack direction={'row'} sx={{ minHeight: '100vh' }}>
          <Box component={'img'} src='/login-bg.png' alt='' sx={{ width: '60%', objectFit: 'cover' }} />
          <Stack sx={{  }}>
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
                  Sign in
                </Typography>
                <Form method="POST">
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
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
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Form>
              </Box>
            </Container>
            <Stack justifyContent={'end'} sx={{ flexGrow: 1, p: 3 }}>
              <Footer />
            </Stack>
        </Stack>
        </Stack>
    </ThemeProvider>
  );
}
