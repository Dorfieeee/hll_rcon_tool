import { get } from "../../../../utils/fetchUtils";

const loader = async () => {
  try {
    // Use Promise.all to wait for all promises to resolve
    const responses = await Promise.all([
      get('get_maps'),
      get('get_map_rotation'),
      get('get_map_shuffle_enabled'),
      get('get_gamestate'),
    ]);

    // Check if any response has a status of 400 or above
    const errorResponse = responses.find((response) => response.status >= 400);
    if (errorResponse) {
      throw new Response('Error while fetching data.', {
        status: errorResponse.status,
      });
    }

    // Map through the responses and convert them to JSON
    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    // Check for errors in the JSON responses
    const errorData = data.find((json) => json.error);
    if (errorData) {
      throw new Response(errorData.error, { status: 500 });
    }

    // Extract the results from the JSON responses
    const [
      maps,
      rotation,
      shuffleEnabled,
      gameState,
    ] = data.map((json) => json.result);

    // Return an object containing all the results
    return {
      maps,
      rotation,
      shuffleEnabled,
      gameState,
    };
  } catch (error) {
    // Handle any errors that occurred during the fetch or processing
    console.error('An error occurred while loading data:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default loader;
