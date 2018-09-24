import dom from '../../main/transpiler';
import { Component } from '../Component';

import { getActivityByPath } from '../../util/Navigation';

export class NavigationContainer extends Component {
  constructor(props) {
    super(props);
    this.setState({
      hash: window.location.hash
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        hash: window.location.hash
      });
    });
  }

  render() {
    const { hash } = this.state;
    const activity = getActivityByPath(hash || '#');

    const Page = activity ? activity.page : null;
    if (Page) {
      return (
        <div>
          <Page />
        </div>
      );
    }
  }
}
