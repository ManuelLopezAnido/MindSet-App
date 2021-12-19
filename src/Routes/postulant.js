import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
