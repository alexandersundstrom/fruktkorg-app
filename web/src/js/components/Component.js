import { flattenArray, generateGuid } from '../util/Util';
import { virtualDOM } from '../main/transpiler';

export class Component {
  // Creates default versions of always existing variables
  constructor(props) {
    this._id = generateGuid();
    this._self = null;
    this.props = props || {};
    this.state = {};
    this.children = null;
  }

  /**
   * Inits children and props, is run before render
   * @param children The components children
   */
  _init(children) {
    this.children = children;

    for (let property in this.props) {
      if (this.props.hasOwnProperty(property)) {
        this.props[`_${property}`] = this.props[property];
        const prot = this.props;
        Object.defineProperty(prot, property, {
          set: x => {
            this.props[`_${property}`] = x;
            this._reRender();
          },
          get: () => {
            return this.props[`_${property}`];
          }
        });
      }
    }
  }

  /**
   * Rerenders the component if the state/props has changed
   */
  _reRender() {
    if (!this._self) {
      return;
    }

    // Finds the current parent element
    const parent =
      this._self.constructor === Array
        ? this._self[0].parentElement
        : this._self.parentElement;
    if (!parent) {
      return;
    }

    let oldSelf = this._self;
    this._self = this.render();
    if (!this._self) {
      return;
    }

    // Removes all but one element from the old component
    if (oldSelf.constructor === Array) {
      oldSelf = flattenArray(oldSelf);
      for (let i = 1; i < oldSelf.length; ++i) {
        parent.removeChild(oldSelf[i]);
      }
      oldSelf = oldSelf[0];
    }

    // Replaces whats left of the old component with the new component
    if (this._self.constructor === Array) {
      let sibling;
      for (let node of flattenArray(this._self)) {
        if (oldSelf) {
          parent.replaceChild(node, oldSelf);
          oldSelf = null;
          sibling = node;
        } else {
          sibling.parentNode.insertBefore(node, sibling.nextSibling);
        }
      }
    } else {
      parent.replaceChild(this._self, oldSelf);
    }

    virtualDOM.rerenderedComponent(this);
  }

  /**
   * Sets the current state, also triggers a rerender
   * @param newState The new state object, will overrite the exiting properties, add new properties and leave old properties
   */
  setState(newState) {
    let madeChange = false;

    for (let property in newState) {
      if (newState.hasOwnProperty(property)) {
        if (typeof this.state[property] !== 'undefined') {
          if (this.state[`_${property}`] === newState[property]) {
            continue;
          }
          this.state[`_${property}`] = newState[property];
          madeChange = true;
        } else {
          this.state[`_${property}`] = newState[property];
          const prot = this.state;
          Object.defineProperty(prot, property, {
            set: x => {},
            get: () => {
              return this.state[`_${property}`];
            }
          });
          madeChange = true;
        }
      }
    }

    if (madeChange) {
      this._reRender();
    }
  }

  /**
   * Called when the component is rendered, should return null | HTMLElements
   */
  render() {
    return null;
  }

  /**
   * Called after the component has been rendered
   */
  componentDidMount() {}

  /**
   * Called after the component has been removed
   */
  componentDidUnmount() {}

  /**
   * Called before unmounting to check if it's okay to unmount, will yield a confirm window if it returns a non-empty string
   */
  componentCanUnmount() {}
}
