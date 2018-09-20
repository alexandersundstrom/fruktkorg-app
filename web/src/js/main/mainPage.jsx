import dom from './transpiler';

import '../../sass/common.scss';
import { Glass } from '../components/Glass/Glass.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import { PageContainer } from '../components/PageContainer/PageContainer.jsx';
import { Header } from '../components/Header/Header.jsx';
import { UserSessionHandler } from '../components/UserSessionHandler/UserSessionHandler.jsx';

export const MainPage = loggedInPerson => {
  const { name, personNummer, permissions } = loggedInPerson;

  return (
    <div>
      <Glass />
      <div id="root" className="theme-standard">
        <Header>
          <UserSessionHandler name={name} personNummer={personNummer} />
        </Header>
        <Navbar permissions={permissions} />
        <PageContainer permissions={permissions} />
      </div>
    </div>
  );
};
