import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import PostulantLayout from 'Components/Layout/PostulantLayout';
import SignUp from 'Components/Postulant/SignUp';
import Postulants from 'Components/Postulant/Postulants';
import PostulantsForm from 'Components/Postulant/Postulants/Form';
import Interviews from 'Components/Postulant/Interviews';
import JobOffers from 'Components/Postulant/JobOffers';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <PostulantLayout>
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/profile`} component={Home} />
        <Route path={`${url}/interviews`} component={Interviews} />
        <Route path={`${url}/jobOffers`} component={JobOffers} />
        <Route path={`${url}/signUp`} component={SignUp} />
        <Route exact path={`${url}/postulants`} component={Postulants} />
        <Route path={`${url}/postulants/form`} component={PostulantsForm} />
      </Switch>
    </PostulantLayout>
  );
};

export default PostulantRoutes;
