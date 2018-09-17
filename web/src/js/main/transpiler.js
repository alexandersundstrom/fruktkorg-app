// This is REQUIRED for the build jsx in the build step!
// DO NOT EDIT unless you know what you are doing.

const dom = (tag, attrs, ...children) => {
  // Custom Components will be functions
  if (typeof tag === 'function') {
    if (tag instanceof Object) {
      const tagObject = new tag();
      if (tagObject.render && typeof tagObject.render === 'function') {
        tagObject.children = children;
        return tagObject.render();
      }
    }

    const result = tag();
    return result === 'FRAGMENT' ? children : result;
  }
  // regular html tags will be strings to create the elements
  if (typeof tag === 'string') {
    // fragments to append multiple children to the initial node
    const fragments = document.createDocumentFragment();
    const element = document.createElement(tag);

    // one or multiple will be evaluated to append as string or HTMLElement
    children.forEach(function handleAppends(child) {
      if (child instanceof HTMLElement) {
        fragments.appendChild(child);
      } else if (typeof child === 'string' || typeof child === 'number') {
        const textnode = document.createTextNode(child);
        fragments.appendChild(textnode);
      } else if (child instanceof Array) {
        child.forEach(handleAppends);
      } else {
        // later other things could not be HTMLElement not strings
        console.log('not appendable', child);
      }
    });
    element.appendChild(fragments);
    // Merge element with attributes
    Object.assign(element, attrs);

    if (attrs instanceof Object) {
      if (attrs.ref && typeof attrs.ref === 'function') {
        attrs.ref(element);
      }

      // Looks for attributes starting with ON and adds them as events on the element
      for (let property in attrs) {
        if (attrs.hasOwnProperty(property)) {
          if (
            property.startsWith('on') &&
            typeof attrs[property] === 'function'
          ) {
            element.addEventListener(
              property.substring(2, property.length).toLocaleLowerCase(),
              attrs[property]
            );
          }
        }
      }
    }

    return element;
  }

  throw new Error('Unknown type');
};

export default dom;
export const Fragment = () => 'FRAGMENT';
