import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import Clients from '../Clients/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import PostulantsForm from '../Postulants/PostulantsForm';
import Profiles from '../Profiles/index';
import Councelors from '../Councelors/index';
import CouncelorsForm from '../Councelors/Form';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import FormSession from '../Sessions/Form/FormSession';
import FormClient from '../Clients/Form/FormClients';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    case '/clients':
      currentScreen = <Clients />;
      break;
    case '/clients/form':
      currentScreen = <FormClient />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/postulants':
      currentScreen = <Postulants />;
      break;
    case '/postulants/form':
      currentScreen = <PostulantsForm />;
      break;
    case '/profiles':
      currentScreen = <Profiles />;
      break;
    case '/councelors':
      currentScreen = <Councelors />;
      break;
    case '/councelors/form':
      currentScreen = <CouncelorsForm />;
      break;
    case '/sessions':
      currentScreen = <Sessions />;
      break;
    case '/sessions/form':
      currentScreen = <FormSession />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
