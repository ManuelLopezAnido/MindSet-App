import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PsychologyLayout from 'Components/Layout/PsychologyLayout';
import Sessions from 'Components/Psychology/Sessions';
import Settings from 'Components/Psychology/Settings';
import Profile from 'Components/Psychology/Profile';
import SessionsSettings from 'Components/Psychology/Settings/Sessions';
import SessionsForm from 'Components/Psychology/Settings/Sessions/Form';

const PsychologyRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <PsychologyLayout>
      <Switch>
        <Route path={`${url}/`} exact component={Sessions} />
        <Route path={`${url}/sessions`} exact component={Sessions} />
        <Route path={`${url}/settings`} component={Settings} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/sessions/form`} component={SessionsForm} />
        {/* <Route path={`${url}/sessions/form/:id`} component={SessionsForm} /> */}
        <Route exact path={`${url}/sessions`} component={Sessions} />
      </Switch>
    </PsychologyLayout>
  );
};
export default PsychologyRoutes;
