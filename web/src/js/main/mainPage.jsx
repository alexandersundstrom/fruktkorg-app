import dom from './transpiler';

import '../../sass/common.scss';

import { ThemeSelector } from '../components/ThemeSelector/ThemeSelector.jsx';
import { Glass } from '../components/Glass/Glass.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import { PageContainer } from '../components/PageContainer/PageContainer.jsx';
import { Header } from '../components/Header/Header.jsx';
import { CurrentUserSession } from "../components/CurrrentUserSession/CurrentUserSession.jsx";

export const MainPage = loggedInPerson => {
  const { name, personNummer, permissions } = loggedInPerson;

  return (
    <div>
      <Glass />
      <div id="root" className="theme-standard">
        <Header>
          <ThemeSelector />
          <CurrentUserSession name={name} personNummer={personNummer}/>
        </Header>
        <Navbar permissions={permissions} />
        <PageContainer permissions={permissions} />
      </div>
    </div>
  );
};
