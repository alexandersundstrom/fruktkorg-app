import dom from '../../../framework/Transpiler';
import { Component } from '../../../framework/Component';
import './PageContainer.scss';

import { NavigationContainer } from '../NavigationContainer/NavigationContainer.jsx';

export class PageContainer extends Component {
  render() {
    return (
      <div className="background-primary">
        <div className="content">
          <div className="fluid-grid grid-column-12  background-secondary">
            <div id="content-outer" className="content-container">
              <div className="row bottom-line" />
              <div className="row padded">
                <div id="content-inner">
                  <NavigationContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row contentFooter" />
      </div>
    );
  }
}
