import dom from '../../main/transpiler';
import './PageContainer.scss';

export class PageContainer {
  render() {
    return (
      <div className="background-primary">
        <div className="content">
          <div className="fluid-grid grid-column-12  background-secondary">
            <div id="content-outer" className="content-container">
              <div className="row bottom-line" />
              <div className="row padded">
                <div id="content-inner" />
              </div>
            </div>
          </div>
        </div>
        <div className="row contentFooter" />
      </div>
    );
  }
}
