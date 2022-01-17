import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Layout from 'Components/Layout';
import Admins from 'Components/Admin/Admins';
import AdminsForm from 'Components/Admin/Admins/Form';
import Applications from 'Components/Admin/Applications';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import Clients from 'Components/Admin/Clients';
import ClientsForm from 'Components/Admin/Clients/Form';
import Interviews from 'Components/Admin/Interviews';
import InterviewsForm from 'Components/Admin/Interviews/Form';
import Positions from 'Components/Admin/Positions';
import PositionsForm from 'Components/Admin/Positions/Form';
import Postulants from 'Components/Postulant/Postulants';
import PostulantsForm from 'Components/Postulant/Postulants/Form';
import Profiles from 'Components/Admin/Profiles';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import Counselors from 'Components/Admin/Counselors';
import CounselorsForm from 'Components/Admin/Counselors/Form';
import Sessions from 'Components/Admin/Sessions';
import SessionsForm from 'Components/Admin/Sessions/Form';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route path={`${url}/admins/form`} component={AdminsForm} />
        <Route path={`${url}/admins/form/:id`} component={AdminsForm} />
        <Route exact path={`${url}/applications`} component={Applications} />
        <Route path={`${url}/applications/form`} component={ApplicationsForm} />
        <Route path={`${url}/applications/form/:id`} component={ApplicationsForm} />
        <Route exact path={`${url}/clients`} component={Clients} />
        <Route path={`${url}/clients/form`} component={ClientsForm} />
        <Route path={`${url}/clients/form/:id`} component={ClientsForm} />
        <Route exact path={`${url}/interviews`} component={Interviews} />
        <Route path={`${url}/interviews/form`} component={InterviewsForm} />
        <Route path={`${url}/interviews/form/:id`} component={InterviewsForm} />
        <Route exact path={`${url}/positions`} component={Positions} />
        <Route path={`${url}/positions/form`} component={PositionsForm} />
        <Route path={`${url}/positions/form/:id`} component={PositionsForm} />
        <Route exact path={`${url}/postulants`} component={Postulants} />
        <Route path={`${url}/postulants/form`} component={PostulantsForm} />
        <Route path={`${url}/postulants/form/:id`} component={PostulantsForm} />
        <Route exact path={`${url}/profiles`} component={Profiles} />
        <Route path={`${url}/workprofiles/form`} component={ProfilesForm} />
        <Route path={`${url}/workprofiles/form/:id`} component={ProfilesForm} />
        <Route exact path={`${url}/counselors`} component={Counselors} />
        <Route path={`${url}/counselors/form`} component={CounselorsForm} />
        <Route path={`${url}/counselors/form/:id`} component={CounselorsForm} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
