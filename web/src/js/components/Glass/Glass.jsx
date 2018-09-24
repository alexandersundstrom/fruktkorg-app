import dom, { Fragment } from '../../main/transpiler';
import { Component } from '../Component';
import './Glass.scss';

let concurrentGlassOnCount = 0;

/**
 * Takes one argument, the loading message to be displayed. Part of the Glass component.
 * @type {function}
 *
 * @param {String} text The message to be displayed.
 */
export const glassOn = text => {
  ++concurrentGlassOnCount;

  const loadingBackground = $('#laddar_bakgrund');
  const loadingText = $('#laddar_text');

  loadingText.html(text);

  loadingBackground.css('visibility', 'visible');
  loadingText.css('visibility', 'visible');
};

/**
 * Removes a loading message. Part of  the Glass component.
 * @type {function}
 */
export const glassOff = () => {
  --concurrentGlassOnCount;

  if (concurrentGlassOnCount === 0) {
    const loadingBackground = $('#laddar_bakgrund');
    const loadingText = $('#laddar_text');

    loadingBackground.css('visibility', 'hidden');
    loadingText.css('visibility', 'hidden');
  }
};

/**
 * Used to render html content that can be used on conjunction with glassOff and glasOn, to render messages while loading content.
 */
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
