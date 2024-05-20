import { postData } from '../../../utils/fetchUtils';

const setMap = (map_name) =>
  postData(`${process.env.REACT_APP_API_URL}set_map`, {
    map_name,
  });

const setVotemap = (config) =>
  postData(`${process.env.REACT_APP_API_URL}set_votemap_config`, config);

const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;
  let response, json;

  switch (intent) {
    case 'reset_map':
    case 'next_map':
    case 'change_map':
      const { map_name } = formData;
      response = await setMap(map_name);
      json = await response.json();
      if (json.error) {
        return {
          intent,
          ok: false,
          error: json.error,
          message: `Map change has failed. Try it again.`,
        };
      }
      return { intent, ok: true, message: `Map is changing to ${map_name}.` };
    case 'set_votemap':
      const { intent, ...config } = formData;
      response = await setVotemap(config);
      json = await response.json();
      if (json.error) {
        return {
          intent,
          ok: false,
          error: json.error,
          message: `Enabling/Disabling votemap has failed.`,
        };
      }
      return {
        intent,
        ok: true,
        message: `Votemap has been ${config.enabled === 'true' ? 'enabled' : 'disabled'}.`,
      };
    default:
      break;
  }

  return { ok: false, message: 'Unknown error.' };
};

export default action;
