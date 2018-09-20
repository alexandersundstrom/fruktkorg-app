import dom from '../../main/transpiler';

import '../../../sass/common.scss';
import './UserSessionHandler.scss';
import { Component } from '../Component';

export class UserSessionHandler extends Component {
  render() {
    const { name, personNummer } = this.props;
    return (
      <div className="inloggad">
        <ul className="user-list">
          <li>Du är inloggad som {name}</li>
          <li>{personNummer}</li>
          <li>
            <a className="logga-ut" id="loggaut_pc">
              Logga ut
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
