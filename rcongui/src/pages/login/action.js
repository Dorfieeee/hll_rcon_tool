import { redirect } from 'react-router-dom';
import { postData } from '../../utils/fetchUtils';

const action = async ({ request }) => {
  const { username, password }  = Object.fromEntries(await request.formData());
  let isAuth = false;

  try {
      const response = await postData(`${process.env.REACT_APP_API_URL}login`, {
        username: username,
        password: password,
      });
      const data = await response.json();
      isAuth = data.result;
  } catch (error) {
    isAuth = false;
  }

  if (isAuth) {
    return redirect('/')
  }

  return false;
};

export default action;
