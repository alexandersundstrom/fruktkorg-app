import { flattenArray, generateGuid } from '../util/Util';
import { virtualDOM } from '../main/transpiler';

const mergeElements = (currentElement, newElement) => {
  if (!compareElements(currentElement, newElement)) {
    copyElement(newElement, currentElement);
  }

  const currentChildren = [...currentElement.childNodes];
  const newChildren = [...newElement.childNodes];
  const addedElements = [];
  const elementsToKeep = [];

  for (let i = 0; i < newChildren.length; ++i) {
    const foundElement = false;
    for (let j = 0; j < currentChildren.length; ++j) {
      if (elementsToKeep.indexOf(j) !== -1) {
        continue;
      }
      if (newChildren[i].tagName === currentChildren[j].tagName) {
        mergeElements(currentChildren[j], newChildren[i]);
        elementsToKeep.push(j);
        foundElement = true;
        addedElements.push(currentChildren[j]);
        break;
      }
    }

    if (!foundElement) {
      if (i === 0) {
        if (currentElement.childNodes.length === 0) {
          currentElement.appendChild(newChildren[i]);
        } else {
          currentElement.insertBefore(
            newChildren[i],
            currentElement.childNodes[i]
          );
        }
      } else {
        currentElement.insertBefore(
          newChildren[i],
          addedElements[i - 1].nextSibling
        );
      }
      addedElements.push(newChildren[i]);
    }
  }

  for (let i = 0; i < currentChildren.length; ++i) {
    if (elementsToKeep.indexOf(i) === -1) {
      currentElement.removeChild(currentChildren[i]);
    }
  }
};

const copyElement = (copyFrom, copyTo) => {
  if (typeof copyTo.tagName === 'undefined') {
    copyTo.nodeValue = copyFrom.nodeValue;
    return;
  }

  if (copyTo.value !== copyFrom.value) {
    copyTo.value = copyFrom.value;
  }

  const oldAttributeNames = copyTo.getAttributeNames();

  for (let attributeName of copyFrom.getAttributeNames()) {
    const fromValue = copyFrom.getAttribute(attributeName);

    if (
      !copyTo.hasAttribute(attributeName) ||
      copyTo.getAttribute(attributeName) !== fromValue
    ) {
      copyTo.setAttribute(attributeName, fromValue);
    }

    const index = oldAttributeNames.indexOf(attributeName);
    if (index > -1) {
      oldAttributeNames.splice(index, 1);
    }
  }

  for (let attributeName of oldAttributeNames) {
    copyTo.removeAttribute(attributeName);
  }
};

const compareElements = (elementA, elementB) => {
  if (elementA.tagName !== elementB.tagName) {
    return false;
  }

  if (
    typeof elementA.attributes === 'undefined' &&
    typeof elementB.attributes === 'undefined'
  ) {
    return elementA.nodeValue === elementB.nodeValue;
  }

  if (
    elementA.getAttributeNames().length !== elementB.getAttributeNames().length
  ) {
    return false;
  }

  for (let attributeName of elementB.getAttributeNames()) {
    if (
      elementA.getAttribute(attributeName) !==
      elementB.getAttribute(attributeName)
    ) {
      return false;
    }
  }

  if (elementA.value !== elementB.value) {
    return false;
  }

  return true;
};

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
   * Inits children and props, is run before render.
   *
   * @param {HTMLElement[]} children The components children.
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
   * Rerenders the component if the state/props has changed.
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

    let newSelf = this.render();

    console.log(this, newSelf, this._self);

    mergeElements(this._self, newSelf);
    // let oldSelf = this._self;
    // this._self = this.render();
    // if (!this._self) {
    //   return;
    // }

    // // Removes all but one element from the old component
    // if (oldSelf.constructor === Array) {
    //   oldSelf = flattenArray(oldSelf);
    //   for (let i = 1; i < oldSelf.length; ++i) {
    //     parent.removeChild(oldSelf[i]);
    //   }
    //   oldSelf = oldSelf[0];
    // }

    // // Replaces whats left of the old component with the new component
    // if (this._self.constructor === Array) {
    //   let sibling;
    //   for (let node of flattenArray(this._self)) {
    //     if (oldSelf) {
    //       parent.replaceChild(node, oldSelf);
    //       oldSelf = null;
    //       sibling = node;
    //     } else {
    //       sibling.parentNode.insertBefore(node, sibling.nextSibling);
    //     }
    //   }
    // } else {
    //   parent.replaceChild(this._self, oldSelf);
    // }

    virtualDOM.rerenderedComponent(this);
  }

  /**
   * Sets the current state, also triggers a rerender.
   *
   * @param {Object} newState The new state object, will overrite the exiting properties, add new properties and leave old properties.
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
              if (!this.state[`_${property}`]) {
                return this.state[`_${property}`];
              }
              if (this.state[`_${property}`].constructor === Array) {
                return [...this.state[`_${property}`]];
              }
              if (typeof this.state[`_${property}`] === 'object') {
                return { ...this.state[`_${property}`] };
              }

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
   * Called when the component is rendered.
   *
   * @return {HTMLElement | null} The component that should be rendered, or null if nothing should be rendered.
   */
  render() {
    return null;
  }

  /**
   * Called after the component has been rendered.
   */
  componentDidMount() {}

  /**
   * Called after the component has been removed.
   */
  componentDidUnmount() {}

  /**
   * Called before unmounting to check if it's okay to unmount, will yield a confirm window if it returns a non-empty string.
   *
   * @return {String} The message that should be displayed.
   */
  componentCanUnmount() {
    return null;
  }
}
