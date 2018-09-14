import dom from './transpiler'

import classNames from 'classnames'
import styles from '../../sass/navigation.scss'

export class NavBar {
  constructor(theme) {
    this.theme = theme;
  }

  render() {
    return (
      <div className={classNames(styles.menu, this.theme.secondaryBgColor)} id="menu_bar">
        <header className="fluid-grid grid-column-12">
          <nav className="row">
            <nav className="column-12">
              <div className="column-12">
                <div className={styles.menuContainer}>
                  <ul className={styles.nav}>
                    <li className={this.theme.primaryBgColor} id="menu_searchfrukt">
                      <a className={this.theme.darkgray} href="#searchFrukt" title="">
                        Frukt Sök
                      </a>
                    </li>
                    <li className={this.theme.primaryBgColor} id="menu_listfruktkorgar">
                      <a className={this.theme.darkgray} href="#listFruktkorgar" title="">
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
