import dom from './transpiler';

import '../../sass/common.scss';
import '../../sass/header.scss';

import { ThemeSelector } from '../components/ThemeSelector/ThemeSelector.jsx';
import { Glass } from '../components/Glass/Glass.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import { PageContainer } from '../components/PageContainer/PageContainer.jsx';
import { Header } from '../components/Header/Header.jsx';

export const MainPage = () => {
  return (
    <div>
      <Glass />
      <div id="root" className="theme-standard">
        <Header>
          <ThemeSelector />
        </Header>
        <Navbar />
        <PageContainer />
      </div>
    </div>
  );
};
