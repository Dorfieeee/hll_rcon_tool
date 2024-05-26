import { postData } from '../../../../utils/fetchUtils';

const API_URL = process.env.REACT_APP_API_URL;

const setVotemapConfig = async (config) => {
  try {
    const response = await postData(`${API_URL}set_votemap_config`, config);
    const data = await response.json();
    if (data.error) {
      throw new Error(`Changing votemap config failed.`);
    }
    return { ok: true, message: `Votemap config was changed.` };
  } catch (error) {
    return { ok: false, error, message: `Unknown error.` };
  }
};

const setMapWhitelist = async (whitelist) => {
  try {
    const response = await postData(
      `${API_URL}do_set_map_whitelist`,
      whitelist
    );
    const data = await response.json();
    if (data.error) {
      throw new Error(`Changing votemap whitelist failed.`);
    }
    return { ok: true, message: `Votemap whitelist was changed.` };
  } catch (error) {
    return { ok: false, error, message: `Unknown error.` };
  }
};

const replaceVotemapSelection = async () => {
  try {
    const response = await postData(`${API_URL}reset_votemap_state`, {});
    const data = await response.json();
    if (data.error) {
      throw new Error(`Reseting votemap selection failed.`);
    }
    return { ok: true, message: `Votemap selection was changed.` };
  } catch (error) {
    return { ok: false, error, message: `Unknown error.` };
  }
};

const setMap = (map_name) =>
  postData(`${process.env.REACT_APP_API_URL}set_map`, {
    map_name,
  });

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
        error = json.error;
        errorMessage = `Map change has failed. Try it again.`;
        break;
      }
      return { intent, ok: true, message: `Map is changing to ${map_name}.` };
    case 'set_votemap':
      const { intent: dummy, ...config } = formData;
      response = await setVotemapConfig(config);
      json = await response.json();
      if (json.error) {
        error = json.error;
        errorMessage = `Enabling/Disabling votemap has failed.`;
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
    return { intent, ok: false, error, message: errorMessage };
  }

  return { intent, ok: false, message: 'Unknown error.' };
};

export default action;

// const action = async ({ request }) => {
//     const formData = Object.fromEntries(await request.formData());
//     const { intent, ...rest } = formData;

//     if (intent === 'set_config') {
//         return await setVotemapConfig(rest);
//     }

//     if (intent === 'do_set_map_whitelist') {
//         return await setMapWhitelist({ map_names: JSON.parse(rest.whitelist) });
//     }

//     if (intent === 'reset_votemap_state') {
//         console.log(intent)
//         return await replaceVotemapSelection();
//     }

//     return { intent, ok: false, message: 'Unknown error.', formData };
// };

// export default action;
