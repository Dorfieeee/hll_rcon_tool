import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import {
  get as apiGet,
  handle_http_errors,
  showResponse,
} from '../../utils/fetchUtils';

const Footer = () => {
  const [repoData, setRepoData] = React.useState([]);
  const [apiVersion, setApiVersion] = React.useState('N/A');

  React.useEffect(() => {
    async function onLoad() {
      try {
        const gitResponse = await fetch(
          'https://api.github.com/repos/MarechJ/hll_rcon_tool/contributors'
        );

        if (gitResponse.status !== 200) {
          throw new Error('Rate limited');
        }

        setRepoData(await gitResponse.json());
      } catch (error) {
        console.error('Something went wrong parsing github data.');
      }

      try {
        const apiResponse = await apiGet('get_version');
        const apiData = await showResponse(apiResponse, 'get_version', false);
        setApiVersion(apiData.result);
      } catch (error) {
        handle_http_errors(error);
      }
    }

    onLoad();
  }, []);

  const renderContributors = () => {
    return repoData
      .filter((d) => d.type === 'User')
      .map((d) => (
        <Link key={d.login} target="_blank" href={d.html_url}>
          {`${d.login} (${d.contributions})`},{' '}
        </Link>
      ));
  };

  const appInfo = `UI Version: ${process.env.REACT_APP_VERSION} API Version: ${apiVersion} - Brought to you by Dr.WeeD, `;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          color="textSecondary"
          variant="caption"
          display="block"
          gutterBottom
        >
          {appInfo}
          {renderContributors()}
        </Typography>
      </Grid>
      {!process.env.REACT_APP_PUBLIC_BUILD ? (
        <Grid item xs={12}>
          <Typography
            color="textSecondary"
            variant="caption"
            display="block"
            gutterBottom
          >
            Join{' '}
            <Link target="_blank" href="https://discord.gg/zpSQQef">
              the discord
            </Link>{' '}
            for announcements, questions, feedback and support. Dev or docs
            contributions are most welcomed.
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Footer;
