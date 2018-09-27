import classnames from 'classnames/dedupe';

import icons from './icons';

function replace(attrs = {}) {
  if (typeof document === 'undefined') {
    throw new Error('`eva.replace()` only works in a browser environment.');
  }

  const elementsToReplace = document.querySelectorAll('[data-eva]');

  Array.from(elementsToReplace).forEach(element =>
    replaceElement(element, attrs),
  );
}

function replaceElement(element, attrs = {}) {
  const elementAttrs = getAttrs(element);
  const name = elementAttrs['data-eva'];
  delete elementAttrs['data-eva'];

  const svgString = icons[name].toSvg({
    ...attrs,
    ...elementAttrs,
    ...{ class: classnames(attrs.class, elementAttrs.class) },
  });
  const svgDocument = new DOMParser().parseFromString(
    svgString,
    'image/svg+xml',
  );
  const svgElement = svgDocument.querySelector('svg');

  element.parentNode.replaceChild(svgElement, element);
}

function getAttrs(element) {
  return Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
}

export default replace;
