import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const PsychologistsRoutes = lazy(() => import('Routes/psychology'));
const HomeRoutes = lazy(() => import('Routes/homePage'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={IsLoading}>
        <Switch>
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Route path="/psychologists" component={PsychologistsRoutes} />
          <Route path="/" exact component={HomeRoutes} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
