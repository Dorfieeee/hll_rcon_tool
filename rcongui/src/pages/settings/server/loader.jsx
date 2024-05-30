import { get } from "../../../utils/fetchUtils";

// autoBalanceThres: data.result.autobalance_threshold,
// teamSwitchCooldownMin: data.result.team_switch_cooldown,
// idleAutokickMin: data.result.idle_autokick_time,
// maxPingMs: data.result.max_ping_autokick,
// queueLength: data.result.queue_length,
// vipSlots: data.result.vip_slots_num,
// autobalanceEnabled: data.result.autobalance_enabled,
// votekickEnabled: data.result.votekick_enabled,

const loader = async () => {
  try {
    // Use Promise.all to wait for all promises to resolve
    const responses = await Promise.all([
      get(`get_server_settings`)
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
      serverSettings,
    ] = data.map((json) => json.result);

    // Return an object containing all the results
    return {
      serverSettings,
    };
  } catch (error) {
    // Handle any errors that occurred during the fetch or processing
    console.error('An error occurred while loading data:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default loader;
