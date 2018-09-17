import dom from '../../main/transpiler';
import './Header.scss';

export class Header {
  render() {
    return <div className="header">{this.children}</div>;
  }
}
