export class Component {
  constructor() {
    this._self = null;
    this.props = {};
    this.state = {};
    this.children = null;
  }

  _init(children, props) {
    this.children = children;
    this.props = props || {};

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

  _reRender() {
    if (!this._self) {
      return;
    }
    
    const parent = this._self.parentElement || this._self[0].parentElement;
    if (!parent) {
      return;
    }

    let oldSelf = this._self;
    this._self = this.render();

    if (oldSelf.constructor === Array) {
      for (let i = 1; i < oldSelf.length; ++i) {
        parent.removeChild(oldSelf[i]);
      }
      oldSelf = oldSelf[0];
    }

    if (this._self.constructor === Array) {
      let sibling;
      for (let node of this._self) {
        if (oldSelf) {
          parent.replaceChild(node, oldSelf);
          oldSelf = null;
          sibling = node;
        } else {
          sibling.parentNode.insertBefore(node, sibling.nextSibling);
        }
      }
    } else {
      parent.replaceChild(node, oldSelf);
    }
  }

  setState(newState) {
    for (let property in newState) {
      if (newState.hasOwnProperty(property)) {
        if(typeof this.state[property] !== 'undefined') {
          this.state[`_${property}`] = newState[property];
        } else {
          this.state[`_${property}`] = newState[property];
          const prot = this.state;
          Object.defineProperty(prot, property, {
            set: x => {},
            get: () => {
              return this.state[`_${property}`];
            }
          });
        }
      }
    }

    this._reRender();
  }

  render() {
    return null;
  }
}
