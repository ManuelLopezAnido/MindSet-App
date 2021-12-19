import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import SignUp from 'Components/Postulant/SignUp';
import Layout from 'Components/Layout';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/signUp`} component={SignUp} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
