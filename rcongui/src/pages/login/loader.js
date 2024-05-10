import { redirect } from "react-router-dom";
import { get } from "../../utils/fetchUtils";

const loader = async () => {
    const response = await get('is_logged_in');
    if (!response.ok) {
        let message = response.statusText;

        if (response.status === 504) {
            message += ". Your server is not responding."
        }

        throw new Response(message, { status: response.status });
    }

    const json = await response.json();
    const authenticated = json.result.authenticated;

    if (authenticated) {
        return redirect('/')
    }

    return { authenticated };
}

export default loader;