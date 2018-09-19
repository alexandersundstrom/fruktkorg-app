import dom from '../../main/transpiler';
import { Component } from '../Component';

import { SearchFruktPage } from '../../page/SearchFruktPage/SearchFruktPage.jsx';
import { WelcomePage } from '../../page/WelcomePage/WelcomePage.jsx';

export const ACTIVITIES = [
  {
    key: 'SEARCH',
    id: 'menu_searchfrukt',
    displayName: 'Frukt Sök',
    path: '#searchFrukt',
    page: SearchFruktPage
  },
  {
    key: 'LIST',
    id: 'menu_listfruktkorgar',
    displayName: 'Fruktkorgar',
    path: '#listFruktkorgar',
    page: null
  }
];

const getPageByPath = path => {
  for (let i = 0; i < ACTIVITIES.length; ++i) {
    if (ACTIVITIES[i].path === path) {
      return ACTIVITIES[i].page;
    }
  }
};

export class NavigationContainer extends Component {
  constructor(props) {
    super(props);
    this.setState({
      hash: window.location.hash
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        hash: window.location.hash
      });
    });
  }

  render() {
    const { hash } = this.state;

    if (!hash) {
      return (
        <div>
          <WelcomePage />
        </div>
      );
    }

    const Page = getPageByPath(hash);
    if (Page) {
      return (
        <div>
          <Page />
        </div>
      );
    }
  }
}
