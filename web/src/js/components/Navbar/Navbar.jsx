import dom from '../../main/transpiler';
import './Navbar.scss';

export class Navbar {
  render() {
    return (
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
      </div>
    );
  }
}
