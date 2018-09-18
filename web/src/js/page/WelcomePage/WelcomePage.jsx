import dom, from '../../main/transpiler';
import { Component } from '../../components/Component';
import { ThemeSelector } from '../../components/ThemeSelector/ThemeSelector.jsx';

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
