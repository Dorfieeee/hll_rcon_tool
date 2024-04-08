/**
 * Flatten the team view into a list of players.
 * @param {TeamViewResult} game The result of `get_team_view` API call.
 * @returns A list of all players in the game
 */
export const extractPlayers = (game) => {
    const players = [];
    const teams = ['axis', 'allies', 'none', 'null']

    for (const teamKey of teams) {
        if (!(teamKey in game)) continue;

        const team = game[teamKey];
        const squads = team['squads'];

        for (const squadKey in squads) {
            const squadPlayers = squads[squadKey].players
            players.push(...squadPlayers)
        }
    }

    return players;
}
