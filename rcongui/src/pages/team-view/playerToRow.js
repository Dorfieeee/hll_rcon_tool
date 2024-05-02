export const playerToRow = (player) => ({
    ...player,
    sessions_count: player.profile.sessions_count,
    current_playtime_seconds: player.profile.current_playtime_seconds,
    kicked_times: player.profile.penalty_count.KICK,
    punish_times: player.profile.penalty_count.PUNISH,
    tempban_times: player.profile.penalty_count.TEMPBAN,
    permaban_times: player.profile.penalty_count.PERMABAN,
});
