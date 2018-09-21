export class VirtualDOM {
  constructor() {
    // Components not yet in the component tree
    this.pendingWrappers = [];
    // Component tree representation
    this.componentTree = null;
    // Root DOM element
    this.rootElement;
  }

  /**
   * Initializes the virtual DOM
   * @param rootElement this is the HTMLElement that the app will be rendered in.
   */
  init(rootElement) {
    this.rootElement = rootElement;
    // Creates a fake component as the root component
    this.componentTree = new ComponentWrapper({
      _id: '-1',
      _self: this.rootElement,
      componentDidMount: () => {},
      componentDidUnmount: () => {},
      componentCanUnmount: () => {}
    });
    // Creates the component tree
    this._reconcileComponents();
    this._initNavListener();
  }

  /**
   * Adds a component to pending components, will be added to the DOM when it reconciles next.
   * @param component the component that should be added
   */
  addComponent(component) {
    this.pendingWrappers.push(new ComponentWrapper(component));
  }

  /**
   * Called when a component gets rerendered from a state/prop change
   * @param component the component that has been rerendered
   */
  rerenderedComponent(component) {
    const wrapper = this._findWrapper(component._id, this.componentTree);
    if (wrapper) {
      // Readds the component to the component tree
      this._reconcileComponents(wrapper);
    }
  }

  /**
   * Sets up the component tree
   * @param root the tree root
   */
  _reconcileComponents(root) {
    // Get the root / sub root to work from
    const rootWrapper = root || this.componentTree;

    if (rootWrapper !== this.componentTree) {
      this._unmount(rootWrapper);
    }

    rootWrapper.childWrappers = [];
    // Reverses the order as it will always read top to bottom with the most inner element first. Doing so will
    // ensure that we start with the inner most children and working our way outwards
    for (let wrapper of this.pendingWrappers.reverse()) {
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
    this.pendingWrappers = [];
  }

  /**
   * Traverses through the component tree to find the wrapper with the specified id.
   * @param id the wrapper id
   * @param root root of the tree that should be traversed
   */
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

  /**
   * Calles componentDidMount on all components in the specified tree
   * @param root root of the tree
   */
  _mount(root) {
    root.component.componentDidMount();
    for (let childWrapper of root.childWrappers) {
      this._mount(childWrapper);
    }
  }

  /**
   * Calles componentDidUnmount on all components in the specified tree
   * @param root root of the tree
   */
  _unmount(root) {
    root.component.componentDidUnmount();
    for (let childWrapper of root.childWrappers) {
      this._unmount(childWrapper);
    }
  }

  /**
   * Traverses through the component tree to find the closest parent to the specified wrapper
   * @param parent the current parent
   * @param wrapper the wrapper hows parent should be found
   */
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

  /**
   * Initializes navigation listeners
   */
  _initNavListener() {
    window.addEventListener('beforeunload', event => {
      const canUnmount = this._canUnmountComponents(this.componentTree);
      if (canUnmount) {
        event.preventDefault();
        event.returnValue = canUnmount;
        return canUnmount;
      }
    });
  }

  /**
   * Traverses through the component tree to check if the components can be unmounted
   * returns a non-empty string if one or more component shouldn't be unmounted
   * @param root the component tree to check
   */
  _canUnmountComponents(root) {
    for (let childWrapper of root.childWrappers) {
      const canUnmount = this._canUnmountComponents(childWrapper);
      if (canUnmount && typeof canUnmount === 'string') {
        return canUnmount;
      }
    }

    return root.component.componentCanUnmount();
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
