import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/footer';
import Header from './components/Header';
import ScoreMenu from './components/Scoreboard/ScoreMenu';
import themes from './themes';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import { Container, ThemeProvider } from '@mui/material';

const generateRoutes = (routes) => {
  return routes.map((route) => {
    const ChildComponent = route.component;
    return (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <ChildComponent />
      </Route>
    );
  });
};

const EmbedApp = () => {
  return (
    <ThemeProvider theme={themes.HLL_No_Background}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          {generateRoutes(publicRoutes)}
          {!process.env.REACT_APP_PUBLIC_BUILD
            ? generateRoutes(adminRoutes)
            : null}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const PublicBuildApp = () => (
  <ThemeProvider theme={themes.HLL}>
    <ToastContainer />
    <CssBaseline />
    <ScoreMenu />
    <HashRouter>
      <Switch>{generateRoutes(publicRoutes)}</Switch>
    </HashRouter>
    <Footer />
  </ThemeProvider>
);

const DefaultApp = () => {
  const userTheme = localStorage.getItem('crconTheme');

  return (
    <ThemeProvider theme={themes[userTheme] ?? themes.Light}>
      <CssBaseline />
      <ToastContainer />
      <HashRouter>
        <Header />
        <Container>
          <Switch>
            {generateRoutes(publicRoutes)}
            {!process.env.REACT_APP_PUBLIC_BUILD
              ? generateRoutes(adminRoutes)
              : null}
          </Switch>
        </Container>
        <Footer />
      </HashRouter>
    </ThemeProvider>
  );
};

function App() {
  const isPublicBuild = process.env.REACT_APP_PUBLIC_BUILD;
  const [isEmbed, setIsEmbed] = React.useState(false);

  React.useEffect(() => {
    const serarchParams = new URLSearchParams(window.location.search);

    setIsEmbed(serarchParams.has('embed'));
  }, [window.location.search]);

  if (isEmbed) {
    return <EmbedApp />;
  }

  if (isPublicBuild) {
    return <PublicBuildApp />;
  }

  return <DefaultApp />;
}

export default App;
