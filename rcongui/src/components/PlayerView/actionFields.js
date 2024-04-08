import { TextField } from "@mui/material";
import React from "react";

export const SendMessageFields = ({ player }) => {
    return (
        <React.Fragment>
            <input value={player.steam_id_64} name='steam_id_64' id='steam_id_64' type='hidden' hidden />
            <TextField
                required
                helperText="The message that will be displayed to the player."
                id="message"
                name="message"
                label="In-game Message"
                type="text"
                variant="outlined"
                autoFocus
                fullWidth
                multiline
                minRows={5}
            />
        </React.Fragment>
    );
};

/**
 * Required fields {
    "player": string,
    "steam_id_64": string,
    "reason": string,
    "message": string,
    }
 */
export const PunishPlayerFields = ({ player }) => {
    return (
        <React.Fragment>
            <input value={player.steam_id_64} name='steam_id_64' id='steam_id_64' type='hidden' hidden />
            <input value={player.name} name='player' id='player' type='hidden' hidden />
            <TextField
                required
                helperText="The message that will be displayed to the player."
                id="reason"
                name="reason"
                label="Reason for punish"
                type="text"
                variant="outlined"
                autoFocus
                fullWidth
                multiline
                minRows={5}
            />
        </React.Fragment>
    );
};

export const SwitchPlayerFields = ({ player }) => {
    return (
        <React.Fragment>
            <input value={player.steam_id_64} name='steam_id_64' id='steam_id_64' type='hidden' hidden />
            <input value={player.name} name='player' id='player' type='hidden' hidden />
        </React.Fragment>
    )
}
