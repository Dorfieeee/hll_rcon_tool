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
import { Alert, Stack } from '@mui/material';
import { Form, useSubmit, useActionData } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

export default function Login() {
  const [loading, setLoading] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const authError = useActionData();

  const submit = useSubmit();

  React.useEffect(() => setLoading(false), [authError]);

  const onSubmit = (values, e) => {
    setLoading(true);
    submit(e.target);
  };

  return (
    <ThemeProvider theme={themes.Light}>
      <Stack direction={'row'} sx={{ minHeight: '100vh' }}>
        <Box
          component={'img'}
          src="/login-bg.png"
          alt=""
          sx={{ width: '60%', objectFit: 'cover' }}
        />
        <Stack sx={{}}>
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
              <Box sx={{ py: 2, height: '64px', width: '100%' }}>
                {authError && !loading && (
                  <Alert severity="error">
                    {authError.message}
                  </Alert>
                )}
              </Box>
              <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name={'username'}
                  rules={{ required: 'Username is required.' }}
                  render={({ field }) => (
                    <TextField
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      name={field.name}
                      inputRef={field.ref}
                      id="username"
                      label="Username"
                      margin="normal"
                      helperText={errors['username']?.message}
                      error={!!errors['username']}
                      autoComplete="username"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={'password'}
                  rules={{ required: 'Password is required.' }}
                  render={({ field }) => (
                    <TextField
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      name={field.name}
                      inputRef={field.ref}
                      id="password"
                      type="password"
                      label="Password"
                      margin="normal"
                      helperText={errors['password']?.message}
                      error={!!errors['password']}
                      autoComplete="current-password"
                      fullWidth
                    />
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </Button>
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
