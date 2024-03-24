import { redirect } from 'react-router-dom';
import { get } from '../utils/fetchUtils';

const action = async ({ request }) => {
  const { intent }  = Object.fromEntries(await request.formData());
  console.log({intent})

  if (intent === 'logout') {
      const response = await get('logout');
      const data = await response.json();
      const success = data.result;

      if (!success) {
        throw data;
      }

      return redirect('/login')
  }
}

export default action;
