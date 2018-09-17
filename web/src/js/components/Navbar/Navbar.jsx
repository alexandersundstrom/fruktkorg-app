import dom from '../../main/transpiler';

import { ACTIVITIES } from '../../util/Navigation';

import './Navbar.scss';

import { ThemeSelector } from '../ThemeSelector/ThemeSelector.jsx';

const getActivities = permissions => {
  const permittedActivities = [];

  for (let i = 0; i < permissions.length; ++i) {
    for (let j = 0; j < ACTIVITIES.length; ++j) {
      if (ACTIVITIES[j].key === permissions[i]) {
        permittedActivities.push(ACTIVITIES[j]);
      }
    }
  }

  return permittedActivities;
};

export class Navbar {
  render() {
    const { permissions } = this.props;
    return (
      <div className="menu" id="menu_bar">
        <header className="fluid-grid grid-column-12">
          <nav className="row">
            <nav className="column-12">
              <div className="column-12">
                <div className="menu-container">
                  <ul className="nav">
                    {getActivities(permissions).map(activity => {
                      return (
                        <li id={activity.id}>
                          <a href={activity.path}>{activity.displayName}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </nav>
          </nav>
        </header>
      </div>
    );
  }
}
