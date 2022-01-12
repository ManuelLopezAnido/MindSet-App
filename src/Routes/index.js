import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import Login from 'Components/Auth/Login';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const HomeRoutes = lazy(() => import('Routes/homePage'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={IsLoading}>
        <Switch>
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={HomeRoutes} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
