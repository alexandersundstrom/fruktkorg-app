import dom from '../../main/transpiler';
import { Component } from '../Component';
import './ThemeSelector.scss';

const onChange = event => {
  $('#root').removeClass();
  $('#root').addClass(event.target.value);
};

export class ThemeSelector extends Component {
  render() {
    return (
      <div className="theme-container">
        <div className="brodtext">Tema</div>
        <div className="theme-selector-container">
          <select onChange={onChange}>
            <option value="theme-standard">Standard</option>
            <option value="theme-high-contrast">High Contrast</option>
          </select>
        </div>
      </div>
    );
  }
}
