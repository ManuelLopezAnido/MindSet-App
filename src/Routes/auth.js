import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import HomePageLayout from 'Components/Layout/HomePage/HomePageLayout';
import Login from 'Components/Auth/Login';
import Register from 'Components/Auth/Register';

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <HomePageLayout>
      <Switch>
        <Route path={`${url}/login`} exact component={Login} />
        <Route path={`${url}/signUp`} exact component={Register} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </HomePageLayout>
  );
};

export default HomeRoutes;
