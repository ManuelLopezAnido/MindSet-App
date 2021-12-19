import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import PostulantLayout from 'Components/Layout/PostulantLayout';
import SignUp from 'Components/Postulant/SignUp';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <PostulantLayout>
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/profile`} component={Home} />
        <Route path={`${url}/signUp`} component={SignUp} />
      </Switch>
    </PostulantLayout>
  );
};

export default PostulantRoutes;
