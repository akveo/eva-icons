/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const Svgo = require('svgo');

const optimizeSvg = (svg) => {
  const svgo = new Svgo({
    plugins: [
      { removeHiddenElems: false },
      { convertShapeToPath: false },
      { mergePaths: false },
      { inlineStyles: { onlyMatchedOnce: false } },
      { removeAttrs: { attrs: '(fill|stroke.*)' } },
      { removeTitle: true },
    ],
  });

  return svgo.optimize(svg)
    .then(({ data }) => data );
};

module.exports = optimizeSvg;
