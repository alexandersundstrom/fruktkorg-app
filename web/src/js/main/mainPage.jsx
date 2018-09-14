import dom from './transpiler';

import classNames from 'classnames'

import common from '../../sass/common.scss';
import '../../sass/content.scss';
import footer from '../../sass/footer.scss';
import '../../sass/glass.scss';
import header from '../../sass/header.scss';
import nav from '../../sass/navigation.scss';
import themes from '../../sass/themes/themes.scss';

import { Test } from './test.jsx'
import { NavBar } from './navBar.jsx'

export class MainPage {
  constructor(theme) {
    this.theme = theme;
  }

  render() {
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
          <div className={header.header} />
          <div className={nav.menu} id="menu_bar">
            {/* <header className="fluid-grid grid-column-12">
              <nav className="row">
                <nav className="column-12">
                  <div className="column-12">
                    <div className={nav.menuContainer}>
                      <ul className={nav.nav}>
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
            </header> */}
            <NavBar />
  
            <div className="background-primary">
              <div>
                <div className="content">
                  <div className="fluid-grid grid-column-12  background-secondary">
                    <div id="content-outer" className="content-container">
                      <div className="row bottom-line" />
                      <div className="row padded">
                        <div id="content-inner">
                          <Test />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames(common.row, footer.contentFooter)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export const MainPage = () => {
//   return (
//     <div>
//       <div
//         id="laddar_bakgrund"
//         className="laddar_bakgrund"
//         style="visibility: hidden;"
//       />
//       <div id="laddar_text" className="laddar_text" style="visibility: hidden;">
//         Laddar...
//       </div>
//       <div id="root" className="theme-standard">
//         <div className={header.header} />
//         <div className={nav.menu} id="menu_bar">
//           <header className="fluid-grid grid-column-12">
//             <nav className="row">
//               <nav className="column-12">
//                 <div className="column-12">
//                   <div className={nav.menuContainer}>
//                     <ul className={nav.nav}>
//                       <li id="menu_searchfrukt">
//                         <a href="#searchFrukt" title="">
//                           Frukt Sök
//                         </a>
//                       </li>
//                       <li id="menu_listfruktkorgar">
//                         <a href="#listFruktkorgar" title="">
//                           Fruktkorgar
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </nav>
//             </nav>
//           </header>

//           <div className="background-primary">
//             <div>
//               <div className="content">
//                 <div className="fluid-grid grid-column-12  background-secondary">
//                   <div id="content-outer" className="content-container">
//                     <div className="row bottom-line" />
//                     <div className="row padded">
//                       <div id="content-inner" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={classNames(common.row, footer.contentFooter)} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
