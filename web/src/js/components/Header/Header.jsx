import dom from '../../main/transpiler';
import {Component} from '../Component';
import './Header.scss';

export class Header extends Component {
  render() {
    return <div className="header">
      <div className="fluid-grid grid-column-12">
        {this.children}
      </div>
    </div>;
  }
}
