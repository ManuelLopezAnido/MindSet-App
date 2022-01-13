import React from 'react';
import { Switch, useRouteMatch, Redirect } from 'react-router-dom';
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
import { tokenListener } from 'helper/firebase';
import { useEffect } from 'react';
import PrivateRoute from './PrivateRoute';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  useEffect(() => tokenListener(), []);
  return (
    <Layout>
      <Switch>
        <PrivateRoute exact path={`${url}/admins`} component={Admins} />
        <PrivateRoute path={`${url}/admins/form`} component={AdminsForm} />
        <PrivateRoute path={`${url}/admins/form/:id`} component={AdminsForm} />
        <PrivateRoute exact path={`${url}/applications`} component={Applications} />
        <PrivateRoute path={`${url}/applications/form`} component={ApplicationsForm} />
        <PrivateRoute path={`${url}/applications/form/:id`} component={ApplicationsForm} />
        <PrivateRoute exact path={`${url}/clients`} component={Clients} />
        <PrivateRoute path={`${url}/clients/form`} component={ClientsForm} />
        <PrivateRoute path={`${url}/clients/form/:id`} component={ClientsForm} />
        <PrivateRoute exact path={`${url}/interviews`} component={Interviews} />
        <PrivateRoute path={`${url}/interviews/form`} component={InterviewsForm} />
        <PrivateRoute path={`${url}/interviews/form/:id`} component={InterviewsForm} />
        <PrivateRoute exact path={`${url}/positions`} component={Positions} />
        <PrivateRoute path={`${url}/positions/form`} component={PositionsForm} />
        <PrivateRoute path={`${url}/positions/form/:id`} component={PositionsForm} />
        <PrivateRoute exact path={`${url}/postulants`} component={Postulants} />
        <PrivateRoute path={`${url}/postulants/form`} component={PostulantsForm} />
        <PrivateRoute path={`${url}/postulants/form/:id`} component={PostulantsForm} />
        <PrivateRoute exact path={`${url}/profiles`} component={Profiles} />
        <PrivateRoute path={`${url}/workprofiles/form`} component={ProfilesForm} />
        <PrivateRoute path={`${url}/workprofiles/form/:id`} component={ProfilesForm} />
        <PrivateRoute exact path={`${url}/counselors`} component={Counselors} />
        <PrivateRoute path={`${url}/counselors/form`} component={CounselorsForm} />
        <PrivateRoute path={`${url}/counselors/form/:id`} component={CounselorsForm} />
        <PrivateRoute exact path={`${url}/sessions`} component={Sessions} />
        <PrivateRoute path={`${url}/sessions/form`} component={SessionsForm} />
        <PrivateRoute path={`${url}/sessions/form/:id`} component={SessionsForm} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
