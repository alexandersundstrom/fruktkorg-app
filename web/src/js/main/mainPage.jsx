import '../../sass/common.scss';
import '../../sass/content.scss';
import '../../sass/footer.scss';
import '../../sass/glass.scss';
import '../../sass/header.scss';
import '../../sass/navigation.scss';
import '../../sass/themes/standard.scss';

import dom from './transpiler';

export const MainPage = () => {
  return (
    <div>
      <div
        id="laddar_bakgrund"
        className="laddar_bakgrund"
        style="visibility: hidden;"
      />
      <div id="laddar_text" className="laddar_text" style="visibility: hidden;">
        Laddar...
      </div>
      <div id="root" className="theme-standard">
        <div className="header" />
        <div className="menu" id="menu_bar">
          <header className="fluid-grid grid-column-12">
            <nav className="row">
              <nav className="column-12">
                <div className="column-12">
                  <div className="menu-container">
                    <ul className="nav">
                      <li id="menu_searchfrukt">
                        <a href="#searchFrukt" title="">
                          Frukt Sök
                        </a>
                      </li>
                      <li id="menu_listfruktkorgar">
                        <a href="#listFruktkorgar" title="">
                          Fruktkorgar
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </nav>
          </header>

          <div className="background-primary">
            <div>
              <div className="content">
                <div className="fluid-grid grid-column-12  background-secondary">
                  <div id="content-outer" className="content-container">
                    <div className="row bottom-line" />
                    <div className="row padded">
                      <div id="content-inner" >Lorem ipsum...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row contentFooter" />
          </div>
        </div>
      </div>
    </div>
  );
};
