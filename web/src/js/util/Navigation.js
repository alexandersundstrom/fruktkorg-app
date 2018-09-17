import { SearchFruktPage } from '../page/SearchFruktPage/SearchFruktPage.jsx';

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

export const navigate = () => {
  const page = getPageByPath(window.location.hash);

  if (page) {
    $('#content-inner').html(new page().render());
  }
};

export const setupNavigationListener = () => {
  window.addEventListener('hashchange', navigate);
};
