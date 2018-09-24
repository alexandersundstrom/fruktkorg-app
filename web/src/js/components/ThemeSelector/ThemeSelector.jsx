import dom from '../../main/transpiler';
import { Component } from '../Component';
import './ThemeSelector.scss';

const onChange = event => {
  $('#root').removeClass();
  $('#root').addClass(event.target.value);
};

/**
 * Creates an element for changing CSS theme. Themes are defined in themes.scss along with functions (themify and themed) used for creating
 * theme specific styling. See Header.scss as a reference for usage.
 */
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
