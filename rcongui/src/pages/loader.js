import { redirect } from "react-router-dom";
import { get } from "../utils/fetchUtils";

const loader = async () => {
    try {
        const response = await get('is_logged_in');
        const data = await response.json();

        const authenticated = data.result.authenticated;

        if (!authenticated) {
            throw new Error('Not authenticated.')
        }

        return { authenticated };

    } catch (error) {
        return redirect('/login')
    }
}

export default loader;