import { postData } from "../../../../utils/fetchUtils";

const setVotemapConfig = (config) =>
    postData(`${process.env.REACT_APP_API_URL}set_votemap_config`, config);

const action = async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { intent: formIntent } = formData;
    let response, json, error, errorMessage, actionResponse;

    console.log(formData)

    if (formIntent === 'set_config') {
        const { intent, ...config } = formData;
        response = await setVotemapConfig(config);
        json = await response.json();
        if (json.error) {
            error = json.error
            errorMessage = `Changing votemap config failed.`
        } else {
            actionResponse = {
                intent,
                ok: true,
                message: `Votemap config was changed.`,
            };
        }
    }

    if (actionResponse) {
        return actionResponse;
    }

    if (error) {
        return { formIntent, ok: false, error, message: errorMessage }
    }

    return { formIntent, ok: false, message: 'Unknown error.' };
};

export default action;