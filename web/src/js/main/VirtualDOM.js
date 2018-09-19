export class VirtualDOM {
  constructor() {
    this.wrappers = [];
    this.rootElement;
  }

  init(rootElement) {
    this.rootElement = rootElement;
  }

  addComponent(component) {
    this.wrappers.push(new ComponentWrapper(component));
  }

  rerenderedComponent(component) {
    this.wrappers.forEach(
      wrapper =>
        (wrapper.mounted =
          wrapper.id === component._id ? false : wrapper.mounted)
    );

    this.removeOrphans();
    console.log(this.wrappers);
  }

  mount() {
    this.wrappers.filter(wrapper => !wrapper.mounted).map(wrapper => {
      wrapper.component.componentDidMount();
      wrapper.mounted = true;
    });
  }

  removeOrphans() {
    this.wrappers = this.wrappers.filter(wrapper =>
      $.contains(this.rootElement, wrapper.component._self)
    );
  }
}

class ComponentWrapper {
  constructor(component) {
    this.mounted = false;
    this.component = component;
    this.id = this.component._id;
  }
}
