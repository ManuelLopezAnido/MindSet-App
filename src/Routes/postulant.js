import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import PostulantLayout from 'Components/Layout/PostulantLayout';
import SignUp from 'Components/Postulant/SignUp';
import Postulants from 'Components/Postulant/Postulants';
import PostulantsForm from 'Components/Postulant/Postulants/Form';
import Interviews from 'Components/Postulant/Interviews';
import JobOffers from 'Components/Postulant/JobOffers';
import PrivateRoute from './PrivateRoute';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <PostulantLayout>
      <Switch>
        <PrivateRoute path={`${url}/`} exact component={Home} />
        <PrivateRoute path={`${url}/profile`} component={Home} />
        <PrivateRoute path={`${url}/interviews`} component={Interviews} />
        <PrivateRoute path={`${url}/jobOffers`} component={JobOffers} />
        <PrivateRoute path={`${url}/signUp`} component={SignUp} />
        <PrivateRoute exact path={`${url}/postulants`} component={Postulants} />
        <PrivateRoute path={`${url}/postulants/form`} component={PostulantsForm} />
      </Switch>
    </PostulantLayout>
  );
};

export default PostulantRoutes;
