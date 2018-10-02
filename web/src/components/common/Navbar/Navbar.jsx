import dom from '../../../framework/Transpiler';
import { Component } from '../../../framework/Component';
import {
  navigate,
  getActivityByPath,
  getActivitiesByPermissions
} from '../../util/Navigation';

import './Navbar.scss';

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.setState({
      activeActivity: getActivityByPath(window.location.hash || '#')
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        activeActivity: getActivityByPath(window.location.hash || '#')
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
                    {getActivitiesByPermissions(permissions).map(activity => {
                      return (
                        <li
                          id={activity.id}
                          className={
                            activeActivity && activeActivity.id === activity.id
                              ? 'active'
                              : ''
                          }
                        >
                          <a onClick={() => navigate(activity.path)}>
                            {activity.displayName}
                          </a>
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
