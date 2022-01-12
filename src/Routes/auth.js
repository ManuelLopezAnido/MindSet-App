import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HomePage from 'Components/Home';
import HomePageLayout from 'Components/Layout/HomePage/HomePageLayout';

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <HomePageLayout>
      <Switch>
        <Route path={`${url}/`} exact component={HomePage} />
      </Switch>
    </HomePageLayout>
  );
};

export default HomeRoutes;
