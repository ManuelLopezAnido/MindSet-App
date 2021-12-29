import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const HomeRoutes = lazy(() => import('Routes/homePage'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={IsLoading}>
        <Switch>
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/" component={HomeRoutes} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
