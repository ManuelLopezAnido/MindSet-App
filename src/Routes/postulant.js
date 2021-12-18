import { Switch, Route } from 'react-router-dom';
import Home from 'Components/Home';
import Layout from 'Components/Layout';

const PostulantRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
