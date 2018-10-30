/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import classnames from 'classnames/dedupe';

import icons from './icons';

const animationKeys = {
  'data-eva-animation': 'type',
  'data-eva-hover': 'hover',
  'data-eva-infinite': 'infinite',
};

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
    'text/html',
  );
  const svgElement = svgDocument.querySelector('.eva-hover') || svgDocument.querySelector('svg');

  element.parentNode.replaceChild(svgElement, element);
}

function getAttrs(element) {
  return Array.from(element.attributes).reduce((attrs, attr) => {
    if (!!animationKeys[attr.name]) {
      attrs['animation'] = {
        ...attrs['animation'],
        [animationKeys[attr.name]]: attr.value,
      };
    } else {
      attrs[attr.name] = attr.value;
    }

    return attrs;
  }, {});
}

export default replace;
