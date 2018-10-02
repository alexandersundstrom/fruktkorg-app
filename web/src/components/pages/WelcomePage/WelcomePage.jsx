import dom from '../../../framework/Transpiler';
import { Component } from '../../../framework/Component';
import { ThemeSelector } from '../../common/ThemeSelector/ThemeSelector.jsx';

export class WelcomePage extends Component {
  render() {
    return (
      <div>
        <h2>Välkommen</h2>
        <h3>Här kan du välja att göra följande</h3>
        <ThemeSelector />
      </div>
    );
  }
}
