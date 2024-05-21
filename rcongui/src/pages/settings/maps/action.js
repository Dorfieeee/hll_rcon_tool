import { postData } from '../../../utils/fetchUtils';

const setMap = (map_name) =>
  postData(`${process.env.REACT_APP_API_URL}set_map`, {
    map_name,
  });

const setVotemapConfig = (config) =>
  postData(`${process.env.REACT_APP_API_URL}set_votemap_config`, config);

const resetVotemapState = () =>
  postData(`${process.env.REACT_APP_API_URL}reset_votemap_state`, {});

const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;
  let response, json, error, errorMessage;

  switch (intent) {
    case 'reset_map':
    case 'next_map':
    case 'change_map':
      const { map_name } = formData;
      response = await setMap(map_name);
      json = await response.json();
      if (json.error) {
        error = json.error
        errorMessage = `Map change has failed. Try it again.`
        break;
      }
      return { intent, ok: true, message: `Map is changing to ${map_name}.` };
    case 'set_votemap':
      const { intent: dummy, ...config } = formData;
      response = await setVotemapConfig(config);
      json = await response.json();
      if (json.error) {
        error = json.error
        errorMessage = `Enabling/Disabling votemap has failed.`
        break;
      }
      return {
        intent,
        ok: true,
        message: `Votemap has been ${config.enabled === 'true' ? 'enabled' : 'disabled'}.`,
      };
    case 'reset_votemap':
      break;
    default:
      break;
  }

  if (error) {
    return { intent, ok: false, error, message: errorMessage }
  }

  return { intent, ok: false, message: 'Unknown error.' };
};

export default action;
