import dom, { Fragment } from '../../main/transpiler';
import {Component} from '../Component';

const onChange = event => {
  $('#root').removeClass();
  $('#root').addClass(event.target.value);
};

export class ThemeSelector extends Component {
  render() {
    return (
      <Fragment>
        <span className="brodtext">Tema </span>
        <select onChange={onChange}>
          <option value="theme-standard">Standard</option>
          <option value="theme-high-contrast">High Contrast</option>
        </select>
      </Fragment>
    );
  }
}
