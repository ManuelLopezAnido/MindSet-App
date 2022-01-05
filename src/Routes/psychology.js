import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PsychologyLayout from 'Components/Layout/PsychologyLayout';
import Candidates from 'Components/Psychology/Candidates';
import Sessions from 'Components/Psychology/Sessions';
import Settings from 'Components/Psychology/Settings';
import Profile from 'Components/Psychology/Profile';

const PsychologyRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <PsychologyLayout>
      <Switch>
        <Route path={`${url}/`} exact component={Candidates} />
        <Route path={`${url}/candidates`} component={Candidates} />
        <Route path={`${url}/sessions`} component={Sessions} />
        <Route path={`${url}/settings`} component={Settings} />
        <Route path={`${url}/profile`} component={Profile} />
      </Switch>
    </PsychologyLayout>
  );
};
export default PsychologyRoutes;
