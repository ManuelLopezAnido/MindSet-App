import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HomePageLayout from 'Components/Layout/HomePage/HomePageLayout';
import Login from 'Components/Auth/Login';
import SignUp from 'Components/Postulant/SignUp';

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <HomePageLayout>
      <Switch>
        <Route path={`${url}/login`} exact component={Login} />
        <Route path={`${url}/signUp`} exact component={SignUp} />
      </Switch>
    </HomePageLayout>
  );
};

export default HomeRoutes;
