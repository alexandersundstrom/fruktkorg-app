const dom = (tag, attrs, ...children) => {
  // Custom Components will be functions
  if (typeof tag === 'function') {
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

    if (
      attrs instanceof Object &&
      attrs.ref &&
      typeof attrs.ref === 'function'
    ) {
      attrs.ref(element);
    }

    return element;
  }

  throw new Error('Unknown type');
};

export default dom;
export const Fragment = () => 'FRAGMENT';
