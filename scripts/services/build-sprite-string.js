/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const DEFAULT_ATTRS = require('../../package/src/default-attrs.json');

const toSvgSymbol = (name, contents) => {
  return `<symbol id="${name}" viewBox="${DEFAULT_ATTRS.viewBox}">${
    contents
    }</symbol>`;
};

const buildSpriteString = (icons) => {
  const symbols = Object.keys(icons)
    .map(icon => toSvgSymbol(icon, icons[icon]))
    .join('');

  return `<svg xmlns="${DEFAULT_ATTRS.xmlns}"><defs>${symbols}</defs></svg>`;
};

module.exports = buildSpriteString;
