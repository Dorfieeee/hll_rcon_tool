import { Grid } from "@mui/material";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HLLSettings from "../SettingsView/hllSettings";
import RconSettings from "../RconSettings/rconSettings";
import settingRoutes from "../../routes/settings"

const Settings = () => {
  const generateSettingRoutes = (routes) => {
    return routes.map((route) => {
      const ChildComponent = route.component;
      return (
        <Route path={route.path} key={route.path}>
          <ChildComponent
            description={route.description}
            getEndpoint={`get_${route.name}`}
            setEndpoint={`set_${route.name}`}
            validateEndpoint={`validate_${route.name}`}
            describeEndpoint={`describe_${route.name}`}
          />
        </Route>
      );
    });
  };

  return (
    <Switch>
      <Route path="/settings/settings">
        <Grid container>
          <Grid item sm={12} lg={6}>
            <HLLSettings />
          </Grid>
          <Grid item sm={12} lg={6}>
            <RconSettings />
          </Grid>
        </Grid>
      </Route>
      {generateSettingRoutes(settingRoutes)}
    </Switch>
  );
};

export default Settings;
