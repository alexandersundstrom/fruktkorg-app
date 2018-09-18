import dom from '../../main/transpiler';
import { Component } from '../../components/Component';
import './PageContainer.scss';
import { ThemeSelector } from "../ThemeSelector/ThemeSelector.jsx";

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
                  <h2>Välkommen</h2>
                  <h3>Här kan du välja att göra följande</h3>
                  <ThemeSelector/>
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
