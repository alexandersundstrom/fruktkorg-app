export class VirtualDOM {
  constructor() {
    // Components not yet in the component tree
    this.wrappers = [];
    // Component tree representation
    this.componentTree = null;
    // Root DOM element
    this.rootElement;
  }

  // Initializes the virtual DOM
  init(rootElement) {
    this.rootElement = rootElement;
    // Creates a fake component as the root component
    this.componentTree = new ComponentWrapper({
      _id: '-1',
      _self: this.rootElement,
      componentDidMount: () => {}
    });
    // Creates the component tree
    this._reconcileComponents();
  }

  addComponent(component) {
    this.wrappers.push(new ComponentWrapper(component));
  }

  // Called when a component gets rerendered from a state/prop change
  rerenderedComponent(component) {
    const wrapper = this._findWrapper(component._id, this.componentTree);
    if (wrapper) {
      // Readds the component to the component tree
      this._reconcileComponents(wrapper);
    }
  }

  _reconcileComponents(root) {
    // Get the root / sub root to work from
    const rootWrapper = root || this.componentTree;
    rootWrapper.childWrappers = [];
    // Reverses the order as it will always read top to bottom with the most inner element first. Doing so will
    // ensure that we start with the inner most children and working our way outwards
    for (let wrapper of this.wrappers.reverse()) {
      // Finding the closes parent
      const parent = this._findParent(rootWrapper, wrapper);
      if (!parent) {
        continue;
      }

      wrapper.parentWrapper = parent;
      parent.childWrappers.push(wrapper);
    }

    // Calling the mount function to the newly added component
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
