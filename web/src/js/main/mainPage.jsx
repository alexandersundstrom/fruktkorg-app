import dom from './transpiler';

import '../../sass/common.scss';

import { ThemeSelector } from '../components/ThemeSelector/ThemeSelector.jsx';
import { Glass } from '../components/Glass/Glass.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import { PageContainer } from '../components/PageContainer/PageContainer.jsx';
import { Header } from '../components/Header/Header.jsx';
import { setupNavigationListener } from '../util/Navigation';

export const MainPage = loggedInPerson => {
  const { name, personNummer, permissions } = loggedInPerson;
  setupNavigationListener();

  return (
    <div>
      <Glass />
      <div id="root" className="theme-standard">
        <Header>
          <ThemeSelector />
          <span style="display: inline-block; float: right;">{`${name} - ${personNummer}`}</span>
        </Header>
        <Navbar permissions={permissions} />
        <PageContainer permissions={permissions} />
      </div>
    </div>
  );
};
