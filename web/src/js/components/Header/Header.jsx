import dom from '../../main/transpiler';
import { Component } from '../Component';
import './Header.scss';

export class Header extends Component {
  render() {
    return <div className="header">{this.children}</div>;
  }
}
