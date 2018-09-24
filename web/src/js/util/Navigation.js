import { SearchFruktPage } from '../page/SearchFruktPage/SearchFruktPage.jsx';
import { WelcomePage } from '../page/WelcomePage/WelcomePage.jsx';
import { virtualDOM } from '../main/transpiler';

let currentPage;

export const ACTIVITIES = [
  {
    key: '',
    id: 'menu_welcomepage',
    displayName: 'Start Sida',
    path: '#',
    page: WelcomePage
  },
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

/**
 * Gets the activities that can be accessed with the given permissions
 * @param permissions the users permissions
 */
export const getActivitiesByPermissions = permissions => {
  const permittedActivities = [];

  for (let permission of permissions) {
    for (let activity of ACTIVITIES) {
      if (activity.key === '' || activity.key === permission) {
        permittedActivities.push(activity);
      }
    }
  }

  return permittedActivities;
};

/**
 * Get the activity that for the provided path
 * @param path the activitys path
 */
export const getActivityByPath = path => {
  for (let activity of ACTIVITIES) {
    if (activity.path === path) {
      return activity;
    }
  }

  return null;
};

/**
 * Navigates to provided hash
 * @param hash the hash to navigate to
 */
export const navigate = hash => {
  window.location = hash;
};

/**
 * Initailizes the app navigation
 */
export const initNavigation = () => {
  currentPage = window.location.hash;

  window.addEventListener('beforeunload', event => {
    const canUnmount = virtualDOM.canUnmountComponents();
    if (canUnmount) {
      event.preventDefault();
      event.returnValue = canUnmount;
      return canUnmount;
    }
  });

  window.addEventListener('popstate', () => {
    const canUnmount = virtualDOM.canUnmountComponents();
    if (canUnmount && !confirm(canUnmount)) {
      history.pushState(null, '', currentPage);
      return;
    }

    currentPage = window.location.hash;
  });
};
