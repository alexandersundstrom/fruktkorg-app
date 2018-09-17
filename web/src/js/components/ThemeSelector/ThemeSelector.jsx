import dom from '../../main/transpiler';
import { glassOn } from '../Glass/Glass.jsx';

const onChange = event => {
  $('#root').removeClass();
  $('#root').addClass(event.target.value);
};

export class ThemeSelector {
  render() {
    return (
      <select onChange={onChange}>
        <option value="theme-standard">Standard</option>
        <option value="theme-high-contrast">High Contrast</option>
      </select>
    );
  }
}
