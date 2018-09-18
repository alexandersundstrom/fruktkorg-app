import dom from '../../main/transpiler';

import '../../../sass/common.scss';
import './CurrentUserSession.scss';
import {Component} from "../Component";

export class CurrentUserSession extends Component {

  render() {
    const {name, personNummer} = this.props;
    return (
      <div className="inloggad">
        Du är inloggad som {name}
        <br/>
        {personNummer}
        <br/>
        <a className="logga-ut" id="loggaut_pc">Logga ut</a>
      </div>
    )
  }
}
