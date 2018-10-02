import dom from '../../../framework/Transpiler';

import '../../common/common.scss';
import { Glass } from '../../common/Glass/Glass.jsx';
import { Navbar } from '../../common/Navbar/Navbar.jsx';
import { PageContainer } from '../../common/PageContainer/PageContainer.jsx';
import { Header } from '../../common/Header/Header.jsx';
import { UserSessionHandler } from '../../common/UserSessionHandler/UserSessionHandler.jsx';

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
