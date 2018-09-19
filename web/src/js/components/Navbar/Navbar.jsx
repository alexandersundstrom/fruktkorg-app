import dom from '../../main/transpiler';
import { Component } from '../Component';
import { ACTIVITIES } from '../../util/Navigation';

import './Navbar.scss';

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

const getActivity = path => {
  for (let activity of ACTIVITIES) {
    if (activity.path === path) {
      return activity;
    }
  }

  return null;
};

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.setState({
      activeActivity: getActivity(window.location.hash)
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        activeActivity: getActivity(window.location.hash)
      });
    });
  }

  render() {
    const { permissions } = this.props;
    const { activeActivity } = this.state;
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
                        <li
                          id={activity.id}
                          className={
                            activeActivity && activeActivity.id === activity.id
                              ? 'active'
                              : ''
                          }
                        >
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
