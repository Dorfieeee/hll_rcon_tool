import React from "react";
import { Grid, Typography } from "@mui/material";
import { fromJS } from "immutable";
import { reduce } from "lodash";

export function banListFromServer(data) {
    return fromJS(
        reduce(
            data,
            (acc, val) => {
                if (!acc.hasOwnProperty(val.steam_id_64)) {
                    acc[val.steam_id_64] = new Array(val)
                } else {
                    acc[val.steam_id_64].push(val)
                }
                return acc;
            },
            {}
        )
    );
}


export const PlayerBan = ({ bans, player }) => {
    const playerBans = bans.get(player.get('steam_id_64'))
    const formattedBans = {}

    playerBans?.forEach(b => b.get('type') === 'temp' ? formattedBans.temp = 'IS TEMP BANNED' : formattedBans.perma = 'IS PERMA BANNED')
    return (
        <Grid
            container
            justifyContent="space-between"
            spacing={0}
        >
            <Grid item xs={6}>
                {formattedBans.temp ?
                    <Typography variant="h7" color="secondary">{formattedBans.temp}</Typography>
                    : ""
                }
            </Grid>
            <Grid item xs={6}>
                {formattedBans.perma ?
                    <Typography variant="h7" color="secondary">{formattedBans.perma}</Typography>
                    : ""
                }
            </Grid>
        </Grid>
    );
}