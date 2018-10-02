import { SearchFruktPage } from '../pages/SearchFruktPage/SearchFruktPage.jsx';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage.jsx';
import { virtualDOM } from '../../framework/Transpiler';
import { CreateFruktkorgPage } from '../pages/CreateFruktkorgPage/CreateFruktkorgPage.jsx';

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
    key: 'CREATE',
    id: 'menu_createfruktkorg',
    displayName: 'Skapa Fruktkorg',
    path: '#createFruktkorg',
    page: CreateFruktkorgPage
  }
];

/**
 * Gets the activities that can be accessed with the given permissions.
 *
 * @param {String[]} permissions The users permissions.
 *
 * @return {Object[]} The permitted activities
 */
export const getActivitiesByPermissions = permissions => {
  const permittedActivities = [ACTIVITIES[0]];

  for (let permission of permissions) {
    for (let activity of ACTIVITIES) {
      if (activity.key === permission) {
        permittedActivities.push(activity);
      }
    }
  }

  return permittedActivities;
};

/**
 * Get the activity that for the provided path.
 *
 * @param {String} path The activitys path.
 *
 * @return {Object | null} The activity with the provided path, or null if no match was found.
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
 * Navigates to provided hash.
 *
 * @param {String} hash The hash to navigate to.
 */
export const navigate = hash => {
  window.location = hash;
};

/**
 * Initailizes the app navigation.
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
