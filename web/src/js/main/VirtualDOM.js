export class VirtualDOM {
  constructor() {
    this.wrappers = [];
    this.componentTree = null;
    this.rootElement;
  }

  init(rootElement) {
    this.rootElement = rootElement;
    this.componentTree = new ComponentWrapper({
      _id: '-1',
      _self: this.rootElement,
      componentDidMount: () => {}
    });
    this._reconcileComponents();
  }

  addComponent(component) {
    this.wrappers.push(new ComponentWrapper(component));
  }

  rerenderedComponent(component) {
    const wrapper = this._findWrapper(component._id, this.componentTree);
    if (wrapper) {
      this._reconcileComponents(wrapper);
    }
  }

  _reconcileComponents(root) {
    const rootWrapper = root || this.componentTree;
    rootWrapper.childWrappers = [];
    for (let wrapper of this.wrappers.reverse()) {
      const parent = this._findParent(rootWrapper, wrapper);
      if (!parent) {
        continue;
      }

      wrapper.parentWrapper = parent;
      parent.childWrappers.push(wrapper);
    }

    this._mount(rootWrapper);
    this.wrappers = [];
  }

  _findWrapper(id, root) {
    if (root.id === id) {
      return root;
    }

    for (let childWrapper of root.childWrappers) {
      const foundWrapper = this._findWrapper(id, childWrapper);
      if (foundWrapper) {
        return foundWrapper;
      }
    }

    return null;
  }

  _mount(root) {
    root.component.componentDidMount();
    for (let childWrapper of root.childWrappers) {
      this._mount(childWrapper);
    }
  }

  _findParent(parent, wrapper) {
    if ($.contains(parent.component._self, wrapper.component._self)) {
      for (let childWrapper of parent.childWrappers) {
        const nextParent = this._findParent(childWrapper, wrapper);
        if (!nextParent || nextParent.id === parent.id) {
          continue;
        }

        return nextParent;
      }

      return parent;
    }

    return null;
  }
}

class ComponentWrapper {
  constructor(component) {
    this.component = component;
    this.id = this.component._id;
    this.parentWrapper = null;
    this.childWrappers = [];
  }
}
