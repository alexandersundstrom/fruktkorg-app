export class Component {
  constructor() {
    this._self = null;
    this.params = {};
    this.children = null;
  }

  _init(children, params) {
    this.children = children;
    this.params = params || {};

    for (let property in this.params) {
      if (this.params.hasOwnProperty(property)) {
        this.params[`_${property}`] = this.params[property];
        const prot = this.params;
        Object.defineProperty(prot, property, {
          set: x => {
            this.params[`_${property}`] = x;
            this._reRender();
          },
          get: () => {
            return this.params[`_${property}`];
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
    }
  }

  render() {
    return null;
  }
}
