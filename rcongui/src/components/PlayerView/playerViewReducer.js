export const playerViewReducer = (state, action) => {

    switch (action.type) {
        case 'set_players':
            return {
                ...state,
                players: action.players,
            };
        case 'close':
            return {
                ...state,
                open: false,
            };
        default:
            return {
                open: true,
                players: state.players,
                action: action.action,
                selectedPlayers: action.selectedPlayers,
            };
    }
};
