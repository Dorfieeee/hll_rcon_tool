import { redirect } from 'react-router-dom';
import { postData } from '../../utils/fetchUtils';

const action = async ({ request }) => {
  const { username, password } = Object.fromEntries(await request.formData());
  let isAuth = false;

  try {
    // this throws if 401
    const response = await postData(`${process.env.REACT_APP_API_URL}login`, {
      username: username,
      password: password,
    });

    // this can also catch backend downtime
    if (!response.ok) {
      let message = response.statusText;

      if (response.status === 504) {
        message += ". Your server is not responding."
      }

      return {
        error: response.status,
        message: message,
      };
    }

    const data = await response.json();
    isAuth = data.result;

  } catch (error) {
    // in case of 401
    if (error?.name === 'InvalidLogin') {
      return {
        error: error.name,
        message: 'Invalid login credentials. Try it again.'
      };
    }

    return {
      error: error,
      message: `Unknown error. Open the developer's tool in your browser, navigate to Network tab, record your activity and let us know about it.`,
    };
  }

  // success, redirect to the home page
  if (isAuth) {
    return redirect('/');
  }

};

export default action;
