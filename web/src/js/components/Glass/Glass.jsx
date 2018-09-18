import dom, { Fragment } from '../../main/transpiler';
import { Component } from '../Component';
import './Glass.scss';

let concurrentGlassOnCount = 0;

export const glassOn = text => {
  ++concurrentGlassOnCount;

  const loadingBackground = $('#laddar_bakgrund');
  const loadingText = $('#laddar_text');

  loadingText.html(text);

  loadingBackground.css('visibility', 'visible');
  loadingText.css('visibility', 'visible');
};

export const glassOff = () => {
  --concurrentGlassOnCount;

  if (concurrentGlassOnCount === 0) {
    const loadingBackground = $('#laddar_bakgrund');
    const loadingText = $('#laddar_text');

    loadingBackground.css('visibility', 'hidden');
    loadingText.css('visibility', 'hidden');
  }
};

export class Glass extends Component {
  render() {
    return (
      <div>
        <div
          id="laddar_bakgrund"
          className="laddar-bakgrund"
          style="visibility: hidden;"
        />
        <div
          id="laddar_text"
          className="laddar-text"
          style="visibility: hidden;"
        >
          Laddar...
        </div>
      </div>
    );
  }
}
