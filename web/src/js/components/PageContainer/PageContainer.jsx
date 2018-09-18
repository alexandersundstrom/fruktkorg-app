import dom from '../../main/transpiler';
import { Component } from '../../components/Component';
import './PageContainer.scss';

import { NavigationContainer } from '../NavigationContainer/NavigationContainer.jsx';
import {WelcomePage} from "../../page/WelcomePage/WelcomePage.jsx";

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
                  {/*<WelcomePage/>*/}
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
